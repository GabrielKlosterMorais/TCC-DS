import Agendamento from '../models/Agendamento.js';

class AgendamentoController {

    static async create(req, res) {
        try {
            const {
                petId,
                servicoIds,
                data,
                hora,
                status,
                observacoes
            } = req.body;

            if (
                !petId ||
                !servicoIds ||
                !Array.isArray(servicoIds) ||
                servicoIds.length === 0 ||
                !data ||
                !hora ||
                !status
            ) {
                return res.status(400).json({
                    message: 'Dados inválidos. Informe petId, servicoIds, data, hora e status.'
                });
            }

            const agendamentoExistente = await Agendamento.findOne({
                data: new Date(data),
                hora,
                status: 'pendente',
                ativo: true
            });

            if (agendamentoExistente) {
                return res.status(409).json({
                    message: 'Já existe um agendamento pendente para este dia e horário.'
                });
            }

            const agendamento = await Agendamento.create({
                petId,
                servicoIds,
                data,
                hora,
                status,
                observacoes
            });

            return res.status(201).json({
                message: 'Agendamento criado com sucesso',
                data: agendamento
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao criar agendamento',
                error: error.message
            });
        }
    }

    static async getAll(req, res) {
        try {
            const agendamentos = await Agendamento.find({
                ativo: true
            })
                .populate({
                    path: 'petId',
                    populate: {
                        path: 'clienteId'
                    }
                })
                .populate('servicoIds');

            return res.status(200).json({
                data: agendamentos
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao encontrar agendamentos',
                error: error.message
            });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;

            const agendamento = await Agendamento.findOne({
                _id: id,
                ativo: true
            })
                .populate({
                    path: 'petId',
                    populate: {
                        path: 'clienteId'
                    }
                })
                .populate('servicoIds');

            if (!agendamento) {
                return res.status(404).json({
                    message: 'Agendamento não encontrado'
                });
            }

            return res.status(200).json({
                data: agendamento
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao encontrar agendamento',
                error: error.message
            });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;

            const {
                petId,
                servicoIds,
                data,
                hora,
                status,
                observacoes
            } = req.body;

            if (
                !servicoIds ||
                !Array.isArray(servicoIds) ||
                servicoIds.length === 0
            ) {
                return res.status(400).json({
                    message: 'É necessário informar pelo menos um serviço.'
                });
            }

            const agendamentoExistente = await Agendamento.findOne({
                _id: { $ne: id },
                data: new Date(data),
                hora,
                status: 'pendente',
                ativo: true
            });

            if (agendamentoExistente) {
                return res.status(409).json({
                    message: 'Já existe um agendamento pendente para este dia e horário.'
                });
            }

            const agendamento = await Agendamento.findOneAndUpdate(
                {
                    _id: id,
                    ativo: true
                },
                {
                    petId,
                    servicoIds,
                    data,
                    hora,
                    status,
                    observacoes
                },
                {
                    new: true
                }
            );

            if (!agendamento) {
                return res.status(404).json({
                    message: 'Agendamento não encontrado'
                });
            }

            return res.status(200).json({
                message: 'Agendamento atualizado com sucesso',
                data: agendamento
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao atualizar agendamento',
                error: error.message
            });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;

            const agendamento = await Agendamento.findByIdAndDelete(id);

            if (!agendamento) {
                return res.status(404).json({
                    message: 'Agendamento não encontrado'
                });
            }

            return res.status(200).json({
                message: 'Agendamento deletado com sucesso'
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao deletar agendamento',
                error: error.message
            });
        }
    }
}

export default AgendamentoController;