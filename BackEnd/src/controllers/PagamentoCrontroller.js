import Pagamento from '../models/Pagamento.js';

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
                    message: "Dados inválidos. Certifique-se de enviar clienteId, agendamentoId, formaPagamento, status e valor."
                });
            }

            const pagamentoData = {
                clienteId,
                agendamentoId,
                formaPagamento,
                status,
                dataPagamento,
                valor
            };

            const newPagamento = await Pagamento.create(pagamentoData);

            return res.status(201).json({
                message: 'Pagamento criado com sucesso',
                data: newPagamento
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
            const pagamentos = await Pagamento.find({ ativo: true })
                .populate('clienteId')
                .populate('agendamentoId');

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
                .populate('agendamentoId');

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

            const updatedData = {
                clienteId,
                agendamentoId,
                formaPagamento,
                status,
                dataPagamento,
                valor
            };

            const updatedPagamento = await Pagamento.findOneAndUpdate(
                {
                    _id: id,
                    ativo: true
                },
                updatedData,
                { new: true }
            );

            if (!updatedPagamento) {
                return res.status(404).json({
                    message: 'Pagamento não encontrado'
                });
            }

            return res.status(200).json({
                message: 'Pagamento atualizado com sucesso',
                data: updatedPagamento
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

            const deletedPagamento = await Pagamento.findOneAndUpdate(
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

            if (!deletedPagamento) {
                return res.status(404).json({
                    message: 'Pagamento não encontrado'
                });
            }

            return res.status(200).json({
                message: 'Pagamento desativado com sucesso',
                data: deletedPagamento
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