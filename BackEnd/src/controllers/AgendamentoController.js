import Agendamento from '../models/Agendamento.js';

class AgendamentoController {
    static async create(req, res) {
        try {
            const {
                petId,
                servicoId,
                data,
                hora,
                status,
                observacoes
            } = req.body;

            if (!petId || !servicoId || !data || !hora || !status) {
                return res.status(400).json({
                    message: "Dados inválidos. Certifique-se de enviar petId, servicoId, data, hora e status."
                });
            }

            // Verifica se já existe um agendamento pendente
            // para o mesmo dia e horário
            const agendamentoExistente = await Agendamento.findOne({
                data: new Date(data),
                hora: hora,
                status: 'pendente',
                ativo: true
            });

            if (agendamentoExistente) {
                return res.status(409).json({
                    message: 'Já existe um agendamento pendente para este dia e horário.'
                });
            }

            const agendamentoData = {
                petId,
                servicoId,
                data,
                hora,
                status,
                observacoes
            };

            const newAgendamento = await Agendamento.create(agendamentoData);

            return res.status(201).json({
                message: 'Agendamento criado com sucesso',
                data: newAgendamento
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
        const agendamentos = await Agendamento.find({ ativo: true })
            .populate({
                path: 'petId',
                populate: {
                    path: 'clienteId'
                }
            })
            .populate('servicoId');

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
            .populate('servicoId');

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
                servicoId,
                data,
                hora,
                status,
                observacoes
            } = req.body;

            const agendamentoExistente = await Agendamento.findOne({
                _id: { $ne: id },
                data: new Date(data),
                hora: hora,
                status: 'pendente',
                ativo: true
            });

            if (agendamentoExistente) {
                return res.status(409).json({
                    message: 'Já existe um agendamento pendente para este dia e horário.'
                });
            }

            const updatedData = {
                petId,
                servicoId,
                data,
                hora,
                status,
                observacoes
            };

            const updatedAgendamento = await Agendamento.findByIdAndUpdate(
                id,
                updatedData,
                { new: true }
            );

            if (!updatedAgendamento) {
                return res.status(404).json({
                    message: 'Agendamento não encontrado'
                });
            }

            return res.status(200).json({
                message: 'Agendamento atualizado com sucesso',
                data: updatedAgendamento
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

            const deletedAgendamento = await Agendamento.findByIdAndDelete(id);

            if (!deletedAgendamento) {
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