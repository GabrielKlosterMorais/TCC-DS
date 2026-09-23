// Importa o Model Pagamento para acessar e modificar
// os pagamentos armazenados no MongoDB.
import Pagamento from '../models/Pagamento.js';

// Importa o Model Agendamento para consultar
// os dados relacionados ao pagamento.
import Agendamento from '../models/Agendamento.js';

// Importa o Model Pet para descobrir qual cliente
// é responsável pelo pet do agendamento.
import Pet from '../models/Pet.js';

// Importa o Model Servico para consultar o preço
// do serviço relacionado ao agendamento.
import Servico from '../models/Servico.js';


// Cria a classe responsável pelas operações
// relacionadas aos pagamentos.
class PagamentoController {


    // Cria um novo pagamento.
    static async create(req, res) {

        try {

            // Retira os dados enviados pelo usuário
            // através do corpo da requisição.
            const {
                clienteId,
                agendamentoId,
                formaPagamento,
                status,
                dataPagamento,
                valor
            } = req.body;


            // Verifica se os campos obrigatórios
            // foram enviados.
            if (
                !clienteId ||
                !agendamentoId ||
                !formaPagamento ||
                !status ||
                !valor
            ) {
                return res.status(400).json({
                    message: "Dados inválidos."
                });
            }


            // Cria o pagamento no banco de dados.
            const pagamento = await Pagamento.create({
                clienteId,
                agendamentoId,
                formaPagamento,
                status,
                dataPagamento,
                valor
            });


            // Retorna o status 201 indicando que
            // o pagamento foi criado com sucesso.
            return res.status(201).json({
                message: 'Pagamento criado com sucesso',
                data: pagamento
            });


        } catch (error) {

            // Trata erros que acontecerem durante
            // a criação do pagamento.
            return res.status(500).json({
                message: 'Erro ao criar pagamento',
                error: error.message
            });
        }
    }


    // Cria automaticamente um pagamento
    // a partir de um agendamento existente.
    static async criarPorAgendamento(req, res) {

        try {

            // Retira o ID do agendamento enviado
            // na requisição.
            const { agendamentoId } = req.body;


            // Procura o agendamento no banco pelo ID.
            const agendamento =
                await Agendamento.findById(agendamentoId);


            // Verifica se o agendamento existe.
            if (!agendamento) {
                return res.status(404).json({
                    message: 'Agendamento não encontrado'
                });
            }


            // Procura o pet relacionado ao agendamento.
            const pet =
                await Pet.findById(agendamento.petId);


            // Verifica se o pet existe.
            if (!pet) {
                return res.status(404).json({
                    message: 'Pet não encontrado'
                });
            }


            // Procura o serviço relacionado ao agendamento.
            const servico =
                await Servico.findById(agendamento.servicoId);


            // Verifica se o serviço existe.
            if (!servico) {
                return res.status(404).json({
                    message: 'Serviço não encontrado'
                });
            }


            // Verifica se já existe um pagamento ativo
            // para esse agendamento.
            const pagamentoExistente =
                await Pagamento.findOne({
                    agendamentoId,
                    ativo: true
                });


            // Impede a criação de mais de um pagamento
            // ativo para o mesmo agendamento.
            if (pagamentoExistente) {
                return res.status(400).json({
                    message: 'Este agendamento já possui um pagamento.'
                });
            }


            // Cria o pagamento automaticamente.
            //
            // O cliente é obtido através do pet.
            // A forma de pagamento inicial é PIX.
            // O status começa como pendente.
            // O valor vem do preço do serviço.
            const pagamento = await Pagamento.create({
                clienteId: pet.clienteId,
                agendamentoId,
                formaPagamento: 'pix',
                status: 'pendente',
                valor: servico.preco
            });


            // Retorna o pagamento criado.
            return res.status(201).json({
                message: 'Pagamento criado com sucesso',
                data: pagamento
            });


        } catch (error) {

            // Trata erros durante a criação automática.
            return res.status(500).json({
                message: 'Erro ao criar pagamento',
                error: error.message
            });
        }
    }


    // Busca todos os pagamentos ativos.
    static async getAll(req, res) {

    try {

        const pagamentos = await Pagamento.find({
            ativo: true
        })
        .populate('clienteId')
        .populate({
            path: 'agendamentoId',
            populate: [
                {
                    path: 'petId',
                    populate: {
                        path: 'clienteId'
                    }
                },
                {
                    path: 'servicoId'
                }
            ]
        })

        return res.status(200).json({
            data: pagamentos
        })

    } catch (error) {

        console.error(
            'Erro ao encontrar pagamentos:',
            error
        )

        return res.status(500).json({
            message: 'Erro ao encontrar pagamentos',
            error: error.message
        })
    }
}


    // Busca um pagamento específico pelo ID.
    static async getById(req, res) {

        try {

            // Pega o ID enviado pela URL.
            const { id } = req.params;


            // Procura o pagamento pelo ID.
            // Também verifica se ele está ativo.
            const pagamento =
                await Pagamento.findOne({
                    _id: id,
                    ativo: true
                })

                    // Busca os dados do cliente.
                    .populate('clienteId')

                    // Busca os dados do agendamento.
                    .populate({
                        path: 'agendamentoId',

                        // Dentro do agendamento, busca
                        // os dados do pet e do serviço.
                        populate: [
                            {
                                path: 'petId'
                            },
                            {
                                path: 'servicoId'
                            }
                        ]
                    });


            // Caso o pagamento não seja encontrado,
            // retorna o status 404.
            if (!pagamento) {
                return res.status(404).json({
                    message: 'Pagamento não encontrado'
                });
            }


            // Retorna o pagamento encontrado.
            return res.status(200).json({
                data: pagamento
            });


        } catch (error) {

            // Trata erros durante a busca.
            return res.status(500).json({
                message: 'Erro ao encontrar pagamento',
                error: error.message
            });
        }
    }


    // Atualiza os dados de um pagamento.
    static async update(req, res) {

        try {

            // Pega o ID do pagamento pela URL.
            const { id } = req.params;


            // Procura o pagamento pelo ID e verifica
            // se ele está ativo.
            //
            // req.body contém os novos dados
            // enviados na requisição.
            const pagamento =
                await Pagamento.findOneAndUpdate(
                    {
                        _id: id,
                        ativo: true
                    },
                    req.body,
                    {
                        // Retorna o pagamento já atualizado.
                        new: true
                    }
                );


            // Caso o pagamento não seja encontrado,
            // retorna o status 404.
            if (!pagamento) {
                return res.status(404).json({
                    message: 'Pagamento não encontrado'
                });
            }


            // Retorna o pagamento atualizado.
            return res.status(200).json({
                message: 'Pagamento atualizado com sucesso',
                data: pagamento
            });


        } catch (error) {

            // Trata erros durante a atualização.
            return res.status(500).json({
                message: 'Erro ao atualizar pagamento',
                error: error.message
            });
        }
    }


    // Desativa um pagamento.
    static async delete(req, res) {

        try {

            // Pega o ID do pagamento pela URL.
            const { id } = req.params;


            // Procura o pagamento ativo e altera
            // seu campo ativo para false.
            //
            // O registro não é apagado definitivamente
            // do banco de dados.
            const pagamento =
                await Pagamento.findOneAndUpdate(
                    {
                        _id: id,
                        ativo: true
                    },
                    {
                        ativo: false
                    },
                    {
                        // Retorna o pagamento depois da alteração.
                        new: true
                    }
                );


            // Caso o pagamento não seja encontrado,
            // retorna o status 404.
            if (!pagamento) {
                return res.status(404).json({
                    message: 'Pagamento não encontrado'
                });
            }


            // Informa que o pagamento foi desativado.
            return res.status(200).json({
                message: 'Pagamento desativado com sucesso',
                data: pagamento
            });


        } catch (error) {

            // Trata erros durante a desativação.
            return res.status(500).json({
                message: 'Erro ao desativar pagamento',
                error: error.message
            });
        }
    }
}


// Exporta o Controller para que ele possa ser utilizado
// pelas rotas da aplicação.
export default PagamentoController;