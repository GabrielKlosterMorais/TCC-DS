import Servico from '../models/Servico.js';

class ServicoController {
    static async create(req, res) {
        try {
            const { nome, descricao, preco, duracao } = req.body;

            if (!nome || !descricao || !preco || !duracao) {
                return res.status(400).json({
                    message: "Dados inválidos. Certifique-se de enviar nome, descrição, preço e duração."
                });
            }

            const servicoData = {
                nome,
                descricao,
                preco,
                duracao
            };

            const newServico = await Servico.create(servicoData);

            return res.status(201).json({
                message: 'Serviço criado com sucesso',
                data: newServico
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao criar serviço',
                error: error.message
            });
        }
    }

    static async getAll(req, res) {
        try {
            const servicos = await Servico.find();

            return res.status(200).json({
                data: servicos
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao encontrar serviços',
                error: error.message
            });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;

            const servico = await Servico.findById(id);

            if (!servico) {
                return res.status(404).json({
                    message: 'Serviço não encontrado'
                });
            }

            return res.status(200).json({
                data: servico
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao encontrar serviço',
                error: error.message
            });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, descricao, preco, duracao } = req.body;

            const updatedData = {
                nome,
                descricao,
                preco,
                duracao
            };

            const updatedServico = await Servico.findByIdAndUpdate(
                id,
                updatedData,
                { new: true }
            );

            if (!updatedServico) {
                return res.status(404).json({
                    message: 'Serviço não encontrado'
                });
            }

            return res.status(200).json({
                message: 'Serviço atualizado com sucesso',
                data: updatedServico
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao atualizar serviço',
                error: error.message
            });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;

            const deletedServico = await Servico.findByIdAndDelete(id);

            if (!deletedServico) {
                return res.status(404).json({
                    message: 'Serviço não encontrado'
                });
            }

            return res.status(200).json({
                message: 'Serviço deletado com sucesso'
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao deletar serviço',
                error: error.message
            });
        }
    }
}

export default ServicoController;

