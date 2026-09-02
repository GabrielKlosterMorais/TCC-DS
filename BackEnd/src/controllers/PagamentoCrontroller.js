import Pagamento from '../models/Pagamento.js';
import Agendamento from '../models/Agendamento.js';
import Pet from '../models/Pet.js';
import Servico from '../models/Servico.js';

class PagamentoController {

    static async create(req, res) {
        try {
            const {
                clienteId,
                agendamentoId,
                formaPagamento,
                status,
                dataPagamento,
                valor
            } = req.body;

            if (!clienteId || !agendamentoId || !formaPagamento || !status || !valor) {
                return res.status(400).json({
                    message: "Dados inválidos."
                });
            }

            const pagamento = await Pagamento.create({
                clienteId,
                agendamentoId,
                formaPagamento,
                status,
                dataPagamento,
                valor
            });

            return res.status(201).json({
                message: 'Pagamento criado com sucesso',
                data: pagamento
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao criar pagamento',
                error: error.message
            });
        }
    }

    static async criarPorAgendamento(req, res) {
        try {
            const { agendamentoId } = req.body;

            const agendamento = await Agendamento.findById(agendamentoId);

            if (!agendamento) {
                return res.status(404).json({
                    message: 'Agendamento não encontrado'
                });
            }

            const pet = await Pet.findById(agendamento.petId);

            if (!pet) {
                return res.status(404).json({
                    message: 'Pet não encontrado'
                });
            }

            const servico = await Servico.findById(agendamento.servicoId);

            if (!servico) {
                return res.status(404).json({
                    message: 'Serviço não encontrado'
                });
            }

            const pagamentoExistente = await Pagamento.findOne({
                agendamentoId,
                ativo: true
            });

            if (pagamentoExistente) {
                return res.status(400).json({
                    message: 'Este agendamento já possui um pagamento.'
                });
            }

            const pagamento = await Pagamento.create({
                clienteId: pet.clienteId,
                agendamentoId,
                formaPagamento: 'pix',
                status: 'pendente',
                valor: servico.preco
            });

            return res.status(201).json({
                message: 'Pagamento criado com sucesso',
                data: pagamento
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao criar pagamento',
                error: error.message
            });
        }
    }

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
                            path: 'petId'
                        },
                        {
                            path: 'servicoId'
                        }
                    ]
                });

            return res.status(200).json({
                data: pagamentos
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao encontrar pagamentos',
                error: error.message
            });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;

            const pagamento = await Pagamento.findOne({
                _id: id,
                ativo: true
            })
                .populate('clienteId')
                .populate({
                    path: 'agendamentoId',
                    populate: [
                        {
                            path: 'petId'
                        },
                        {
                            path: 'servicoId'
                        }
                    ]
                });

            if (!pagamento) {
                return res.status(404).json({
                    message: 'Pagamento não encontrado'
                });
            }

            return res.status(200).json({
                data: pagamento
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao encontrar pagamento',
                error: error.message
            });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;

            const {
                clienteId,
                agendamentoId,
                formaPagamento,
                status,
                dataPagamento,
                valor
            } = req.body;

            const pagamento = await Pagamento.findOneAndUpdate(
                {
                    _id: id,
                    ativo: true
                },
                {
                    clienteId,
                    agendamentoId,
                    formaPagamento,
                    status,
                    dataPagamento,
                    valor
                },
                {
                    new: true
                }
            );

            if (!pagamento) {
                return res.status(404).json({
                    message: 'Pagamento não encontrado'
                });
            }

            return res.status(200).json({
                message: 'Pagamento atualizado com sucesso',
                data: pagamento
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao atualizar pagamento',
                error: error.message
            });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;

            const pagamento = await Pagamento.findOneAndUpdate(
                {
                    _id: id,
                    ativo: true
                },
                {
                    ativo: false
                },
                {
                    new: true
                }
            );

            if (!pagamento) {
                return res.status(404).json({
                    message: 'Pagamento não encontrado'
                });
            }

            return res.status(200).json({
                message: 'Pagamento desativado com sucesso',
                data: pagamento
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao desativar pagamento',
                error: error.message
            });
        }
    }
}

export default PagamentoController;