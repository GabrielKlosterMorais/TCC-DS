import Agendamento from '../models/Agendamento.js'
import Pet from '../models/Pet.js'
import Servico from '../models/Servico.js'
import Pagamento from '../models/Pagamento.js'


class AgendamentoController {

    // =========================================================
    // VERIFICAR CONFLITO DE HORÁRIO
    // =========================================================

    static async verificarConflito(
        servicoId,
        data,
        hora,
        idExcluir = null
    ) {

        // Busca o serviço escolhido
        const servico = await Servico.findById(servicoId)

        if (!servico) {
            return {
                conflito: true,
                erro: 'Serviço não encontrado.'
            }
        }


        // =====================================================
        // VALIDAR DATA
        // =====================================================

        const dataInformada = new Date(data)

        if (isNaN(dataInformada.getTime())) {
            return {
                conflito: true,
                erro: 'Data inválida.'
            }
        }


        // Pega ano, mês e dia
        const ano = dataInformada.getUTCFullYear()

        const mes = String(
            dataInformada.getUTCMonth() + 1
        ).padStart(2, '0')

        const dia = String(
            dataInformada.getUTCDate()
        ).padStart(2, '0')


        // =====================================================
        // INÍCIO E FIM DO DIA
        // =====================================================

        const inicioDoDia = new Date(
            `${ano}-${mes}-${dia}T00:00:00.000Z`
        )

        const fimDoDia = new Date(
            `${ano}-${mes}-${dia}T23:59:59.999Z`
        )


        // =====================================================
        // BUSCAR AGENDAMENTOS DO DIA
        // =====================================================

        const filtro = {

            data: {
                $gte: inicioDoDia,
                $lte: fimDoDia
            },

            status: 'confirmado',

            ativo: true

        }


        // Se estiver editando um agendamento,
        // não compara ele com ele mesmo.

        if (idExcluir) {

            filtro._id = {
                $ne: idExcluir
            }

        }


        const agendamentos =
            await Agendamento
                .find(filtro)
                .populate('servicoId')


        // =====================================================
        // CONVERTER HORÁRIO PARA MINUTOS
        // =====================================================

        const converterHora = (horaString) => {

            if (
                !horaString ||
                typeof horaString !== 'string'
            ) {
                return null
            }


            const partes = horaString.split(':')


            if (partes.length < 2) {
                return null
            }


            const horas = Number(partes[0])

            const minutos = Number(partes[1])


            if (
                Number.isNaN(horas) ||
                Number.isNaN(minutos)
            ) {
                return null
            }


            if (
                horas < 0 ||
                horas > 23 ||
                minutos < 0 ||
                minutos > 59
            ) {
                return null
            }


            return (horas * 60) + minutos
        }


        // =====================================================
        // HORÁRIO DO NOVO AGENDAMENTO
        // =====================================================

        const inicioNovo = converterHora(hora)


        if (inicioNovo === null) {

            return {
                conflito: true,
                erro: 'Horário inválido.'
            }

        }


        // =====================================================
        // HORÁRIO DE FUNCIONAMENTO
        //
        // 07:00 até 18:00
        // =====================================================

        const inicioExpediente = 7 * 60

        const fimExpediente = 18 * 60


        // Não pode começar antes das 07:00

        if (inicioNovo < inicioExpediente) {

            return {
                conflito: true,
                erro:
                    'Os agendamentos só podem começar a partir das 07:00.'
            }

        }


        // =====================================================
        // DURAÇÃO DO SERVIÇO
        // =====================================================

        const duracaoNovo =
            Number(servico.duracao)


        if (
            Number.isNaN(duracaoNovo) ||
            duracaoNovo <= 0
        ) {

            return {
                conflito: true,
                erro:
                    'A duração do serviço é inválida.'
            }

        }


        // Calcula quando o serviço vai terminar

        const fimNovo =
            inicioNovo + duracaoNovo


        // Não pode terminar depois das 18:00

        if (fimNovo > fimExpediente) {

            return {
                conflito: true,
                erro:
                    'O agendamento deve terminar até às 18:00.'
            }

        }


        // =====================================================
        // VERIFICAR CONFLITOS
        // =====================================================

        for (const agendamento of agendamentos) {


            // Segurança extra
            if (
                agendamento.status !== 'confirmado'
            ) {
                continue
            }


            // Segurança extra
            if (
                agendamento.ativo !== true
            ) {
                continue
            }


            // Verifica se o serviço existe

            if (!agendamento.servicoId) {
                continue
            }


            // Horário do agendamento existente

            const inicioExistente =
                converterHora(
                    agendamento.hora
                )


            if (inicioExistente === null) {
                continue
            }


            // Duração do serviço existente

            const duracaoExistente =
                Number(
                    agendamento.servicoId.duracao
                )


            if (
                Number.isNaN(duracaoExistente) ||
                duracaoExistente <= 0
            ) {
                continue
            }


            // Calcula o final do agendamento existente

            const fimExistente =
                inicioExistente +
                duracaoExistente


            // =================================================
            // VERIFICA SOBREPOSIÇÃO
            // =================================================

            if (
                inicioNovo < fimExistente &&
                fimNovo > inicioExistente
            ) {

                return {

                    conflito: true,

                    erro:
                        `Este horário está ocupado. O agendamento existente é às ${agendamento.hora}.`

                }

            }

        }


        // Nenhum conflito encontrado

        return {
            conflito: false
        }

    }


    // =========================================================
    // CRIAR AGENDAMENTO
    // =========================================================

    static async create(req, res) {

        try {

            const {
                petId,
                servicoId,
                data,
                hora,
                observacoes
            } = req.body


            // =================================================
            // VALIDAR CAMPOS
            // =================================================

            if (
                !petId ||
                !servicoId ||
                !data ||
                !hora
            ) {

                return res.status(400).json({

                    message:
                        'Pet, serviço, data e horário são obrigatórios.'

                })

            }


            // =================================================
            // BUSCAR PET
            // =================================================

            const pet =
                await Pet.findOne({

                    _id: petId,

                    ativo: true

                })


            if (!pet) {

                return res.status(404).json({

                    message:
                        'Pet não encontrado.'

                })

            }


            // Verifica se o pet possui cliente

            if (!pet.clienteId) {

                return res.status(400).json({

                    message:
                        'O pet não possui um cliente vinculado.'

                })

            }


            // =================================================
            // BUSCAR SERVIÇO
            // =================================================

            const servico =
                await Servico.findOne({

                    _id: servicoId

                })


            if (!servico) {

                return res.status(404).json({

                    message:
                        'Serviço não encontrado.'

                })

            }


            // =================================================
            // VERIFICAR CONFLITO
            // =================================================

            const conflito =
                await AgendamentoController.verificarConflito(

                    servicoId,

                    data,

                    hora

                )


            if (conflito.conflito) {

                return res.status(409).json({

                    message:
                        conflito.erro

                })

            }


            // =================================================
            // CRIAR AGENDAMENTO
            // =================================================

            const novoAgendamento =
                await Agendamento.create({

                    petId,

                    servicoId,

                    data,

                    hora,

                    status:
                        'confirmado',

                    observacoes

                })


            // =================================================
            // CRIAR PAGAMENTO AUTOMATICAMENTE
            // =================================================

            let novoPagamento


            try {

                novoPagamento =
                    await Pagamento.create({

                        clienteId:
                            pet.clienteId,

                        agendamentoId:
                            novoAgendamento._id,

                        status:
                            'pendente',

                        valor:
                            servico.preco

                    })


            } catch (erroPagamento) {


                // Se o pagamento falhar,
                // remove o agendamento criado.

                await Agendamento.findByIdAndDelete(
                    novoAgendamento._id
                )


                throw erroPagamento

            }


            // =================================================
            // RESPOSTA
            // =================================================

            return res.status(201).json({

                message:
                    'Agendamento confirmado e pagamento pendente criado com sucesso.',

                data:
                    novoAgendamento,

                pagamento:
                    novoPagamento

            })


        } catch (error) {

            console.error(
                'Erro ao criar agendamento:',
                error
            )


            return res.status(500).json({

                message:
                    'Erro ao criar agendamento.',

                error:
                    error.message

            })

        }

    }


    // =========================================================
    // LISTAR TODOS OS AGENDAMENTOS
    // =========================================================

    static async getAll(req, res) {

        try {

            const agendamentos =
                await Agendamento
                    .find({
                        ativo: true
                    })
                    .populate({
                        path: 'petId',
                        populate: {
                            path: 'clienteId'
                        }
                    })
                    .populate('servicoId')


            return res.status(200).json({

                data:
                    agendamentos

            })


        } catch (error) {

            console.error(
                'Erro ao buscar agendamentos:',
                error
            )


            return res.status(500).json({

                message:
                    'Erro ao buscar agendamentos.',

                error:
                    error.message

            })

        }

    }


    // =========================================================
    // BUSCAR AGENDAMENTO POR ID
    // =========================================================

    static async getById(req, res) {

        try {

            const agendamento =
                await Agendamento
                    .findOne({

                        _id:
                            req.params.id,

                        ativo:
                            true

                    })
                    .populate({
                        path: 'petId',
                        populate: {
                            path: 'clienteId'
                        }
                    })
                    .populate('servicoId')


            if (!agendamento) {

                return res.status(404).json({

                    message:
                        'Agendamento não encontrado.'

                })

            }


            return res.status(200).json({

                data:
                    agendamento

            })


        } catch (error) {

            console.error(
                'Erro ao buscar agendamento:',
                error
            )


            return res.status(500).json({

                message:
                    'Erro ao buscar agendamento.',

                error:
                    error.message

            })

        }

    }


    // =========================================================
    // ATUALIZAR AGENDAMENTO
    // =========================================================

    static async update(req, res) {

        try {

            const {
                petId,
                servicoId,
                data,
                hora,
                observacoes
            } = req.body


            // =================================================
            // VALIDAR CAMPOS
            // =================================================

            if (
                !petId ||
                !servicoId ||
                !data ||
                !hora
            ) {

                return res.status(400).json({

                    message:
                        'Pet, serviço, data e horário são obrigatórios.'

                })

            }


            // =================================================
            // BUSCAR AGENDAMENTO
            // =================================================

            const agendamentoAtual =
                await Agendamento.findOne({

                    _id:
                        req.params.id,

                    ativo:
                        true

                })


            if (!agendamentoAtual) {

                return res.status(404).json({

                    message:
                        'Agendamento não encontrado.'

                })

            }


            // Não permite alterar cancelado

            if (
                agendamentoAtual.status ===
                'cancelado'
            ) {

                return res.status(400).json({

                    message:
                        'Agendamento cancelado não pode ser alterado.'

                })

            }


            // =================================================
            // BUSCAR PET
            // =================================================

            const pet =
                await Pet.findOne({

                    _id: petId,

                    ativo: true

                })


            if (!pet) {

                return res.status(404).json({

                    message:
                        'Pet não encontrado.'

                })

            }


            // =================================================
            // BUSCAR SERVIÇO
            // =================================================

            const servico =
                await Servico.findById(
                    servicoId
                )


            if (!servico) {

                return res.status(404).json({

                    message:
                        'Serviço não encontrado.'

                })

            }


            // =================================================
            // VERIFICAR CONFLITO
            // =================================================

            const conflito =
                await AgendamentoController.verificarConflito(

                    servicoId,

                    data,

                    hora,

                    req.params.id

                )


            if (conflito.conflito) {

                return res.status(409).json({

                    message:
                        conflito.erro

                })

            }


            // =================================================
            // ATUALIZAR
            // =================================================

            const agendamento =
                await Agendamento.findOneAndUpdate(

                    {

                        _id:
                            req.params.id,

                        ativo:
                            true

                    },

                    {

                        petId,

                        servicoId,

                        data,

                        hora,

                        observacoes

                    },

                    {

                        new:
                            true,

                        runValidators:
                            true

                    }

                )


            return res.status(200).json({

                message:
                    'Agendamento atualizado com sucesso.',

                data:
                    agendamento

            })


        } catch (error) {

            console.error(
                'Erro ao atualizar agendamento:',
                error
            )


            return res.status(500).json({

                message:
                    'Erro ao atualizar agendamento.',

                error:
                    error.message

            })

        }

    }


    // =========================================================
    // CANCELAR PELO ADMINISTRADOR
    // =========================================================

    static async cancelarAdmin(req, res) {

        try {

            const {
                motivoCancelamento
            } = req.body


            // =================================================
            // VALIDAR MOTIVO
            // =================================================

            if (
                !motivoCancelamento ||
                !motivoCancelamento.trim()
            ) {

                return res.status(400).json({

                    message:
                        'Informe o motivo do cancelamento.'

                })

            }


            // =================================================
            // BUSCAR AGENDAMENTO
            // =================================================

            const agendamento =
                await Agendamento.findOne({

                    _id:
                        req.params.id,

                    ativo:
                        true

                })


            if (!agendamento) {

                return res.status(404).json({

                    message:
                        'Agendamento não encontrado.'

                })

            }


            // =================================================
            // VERIFICAR SE JÁ ESTÁ CANCELADO
            // =================================================

            if (
                agendamento.status ===
                'cancelado'
            ) {

                return res.status(400).json({

                    message:
                        'Este agendamento já foi cancelado.'

                })

            }


            // =================================================
            // CANCELAR AGENDAMENTO
            // =================================================

            agendamento.status =
                'cancelado'


            agendamento.motivoCancelamento =
                motivoCancelamento.trim()


            await agendamento.save()


            // =================================================
            // CANCELAR PAGAMENTO PENDENTE
            // =================================================

            const pagamento =
                await Pagamento.findOneAndUpdate(

                    {

                        agendamentoId:
                            agendamento._id,

                        status:
                            'pendente',

                        ativo:
                            true

                    },

                    {

                        status:
                            'cancelado'

                    },

                    {

                        new:
                            true

                    }

                )


            return res.status(200).json({

                message:
                    'Agendamento cancelado pelo administrador.',

                data:
                    agendamento,

                pagamento

            })


        } catch (error) {

            console.error(
                'Erro ao cancelar pelo administrador:',
                error
            )


            return res.status(500).json({

                message:
                    'Erro ao cancelar agendamento.',

                error:
                    error.message

            })

        }

    }


// =========================================================
// CANCELAR PELO CLIENTE
// =========================================================

static async cancelarCliente(req, res) {

    try {

        const { id } = req.params

        const {
            clienteId,
            motivoCancelamento
        } = req.body


        console.log('==============================')
        console.log('TENTATIVA DE CANCELAMENTO')
        console.log('ID DO AGENDAMENTO:', id)
        console.log('ID DO CLIENTE:', clienteId)
        console.log('MOTIVO:', motivoCancelamento)


        // =====================================================
        // VALIDAR CLIENTE
        // =====================================================

        if (!clienteId) {

            return res.status(400).json({
                message: 'Cliente não informado.'
            })

        }


        // =====================================================
        // VALIDAR MOTIVO
        // =====================================================

        if (
            !motivoCancelamento ||
            !motivoCancelamento.trim()
        ) {

            return res.status(400).json({
                message:
                    'Informe o motivo do cancelamento.'
            })

        }


        // =====================================================
        // BUSCAR AGENDAMENTO
        // =====================================================

        const agendamento =
            await Agendamento.findById(id)
                .populate('petId')


        console.log(
            'AGENDAMENTO ENCONTRADO:',
            agendamento
        )


        if (!agendamento) {

            return res.status(404).json({
                message:
                    'Agendamento não encontrado.'
            })

        }


        // =====================================================
        // VERIFICAR PET
        // =====================================================

        if (!agendamento.petId) {

            return res.status(404).json({
                message:
                    'O pet deste agendamento não foi encontrado.'
            })

        }


        // =====================================================
        // PEGAR CLIENTE DO PET
        // =====================================================

        const donoDoPet =
            String(agendamento.petId.clienteId)

        const clienteQueCancelou =
            String(clienteId)


        console.log(
            'DONO DO PET:',
            donoDoPet
        )

        console.log(
            'CLIENTE QUE ESTÁ CANCELANDO:',
            clienteQueCancelou
        )


        // =====================================================
        // VERIFICAR SE É O DONO
        // =====================================================

        if (
            donoDoPet !== clienteQueCancelou
        ) {

            console.log(
                'ERRO: cliente não é dono do pet.'
            )

            return res.status(403).json({
                message:
                    'Você não pode cancelar este agendamento.'
            })

        }


        // =====================================================
        // VERIFICAR STATUS
        // =====================================================

        if (
            agendamento.status === 'cancelado'
        ) {

            return res.status(400).json({
                message:
                    'Este agendamento já está cancelado.'
            })

        }


        // =====================================================
        // CANCELAR
        // =====================================================

        agendamento.status = 'cancelado'

        agendamento.motivoCancelamento =
            motivoCancelamento.trim()


        await agendamento.save()


        console.log(
            'AGENDAMENTO CANCELADO COM SUCESSO:',
            agendamento._id
        )


        // =====================================================
        // CANCELAR PAGAMENTO
        // =====================================================

        const pagamento =
            await Pagamento.findOneAndUpdate(

                {
                    agendamentoId:
                        agendamento._id,

                    status:
                        'pendente',

                    ativo:
                        true
                },

                {
                    status:
                        'cancelado'
                },

                {
                    new:
                        true
                }
            )


        console.log(
            'PAGAMENTO:',
            pagamento
                ? pagamento._id
                : 'Nenhum pagamento pendente'
        )


        // =====================================================
        // RETORNAR
        // =====================================================

        return res.status(200).json({

            message:
                'Agendamento cancelado com sucesso.',

            data:
                agendamento,

            pagamento:
                pagamento

        })


    } catch (error) {

        console.error(
            'ERRO REAL AO CANCELAR:',
            error
        )

        return res.status(500).json({

            message:
                'Erro ao cancelar agendamento.',

            error:
                error.message

        })

    }

}


    // =========================================================
    // DELETAR AGENDAMENTO
    // =========================================================

    static async delete(req, res) {

        try {

            const agendamento =
                await Agendamento.findByIdAndDelete(
                    req.params.id
                )


            if (!agendamento) {

                return res.status(404).json({

                    message:
                        'Agendamento não encontrado.'

                })

            }


            return res.status(200).json({

                message:
                    'Agendamento excluído com sucesso.'

            })


        } catch (error) {

            console.error(
                'Erro ao excluir agendamento:',
                error
            )


            return res.status(500).json({

                message:
                    'Erro ao excluir agendamento.',

                error:
                    error.message

            })

        }

    }

}


export default AgendamentoController