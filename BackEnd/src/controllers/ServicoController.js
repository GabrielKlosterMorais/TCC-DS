import Servico from '../models/Servico.js';

class ServicoController {

    static async create(req, res) {
        try {
            const { nome, descricao, preco, duracao, img } = req.body;

            if (!nome || !descricao || !preco || !duracao) {
                return res.status(400).json({
                    message: 'Dados inválidos. Envie nome, descrição, preço e duração.'
                });
            }

            const servico = await Servico.create({
                nome,
                descricao,
                preco,
                duracao,
                img
            });

            res.status(201).json({
                message: 'Serviço criado com sucesso',
                data: servico
            });

        } catch (error) {
            res.status(500).json({
                message: 'Erro ao criar serviço',
                error: error.message
            });
        }
    }

    static async getAll(req, res) {
        try {
            const servicos = await Servico.find({ ativo: true });

            res.status(200).json({ data: servicos });

        } catch (error) {
            res.status(500).json({
                message: 'Erro ao encontrar serviços',
                error: error.message
            });
        }
    }

    static async getById(req, res) {
        try {
            const servico = await Servico.findOne({
                _id: req.params.id,
                ativo: true
            });

            if (!servico) {
                return res.status(404).json({
                    message: 'Serviço não encontrado'
                });
            }

            res.status(200).json({ data: servico });

        } catch (error) {
            res.status(500).json({
                message: 'Erro ao encontrar serviço',
                error: error.message
            });
        }
    }

    static async update(req, res) {
        try {
            const { nome, descricao, preco, duracao, img } = req.body;

            const servico = await Servico.findOneAndUpdate(
                {
                    _id: req.params.id,
                    ativo: true
                },
                {
                    nome,
                    descricao,
                    preco,
                    duracao,
                    img
                },
                { new: true }
            );

            if (!servico) {
                return res.status(404).json({
                    message: 'Serviço não encontrado'
                });
            }

            res.status(200).json({
                message: 'Serviço atualizado com sucesso',
                data: servico
            });

        } catch (error) {
            res.status(500).json({
                message: 'Erro ao atualizar serviço',
                error: error.message
            });
        }
    }

    static async delete(req, res) {
        try {
            const servico = await Servico.findOneAndUpdate(
                {
                    _id: req.params.id,
                    ativo: true
                },
                { ativo: false },
                { new: true }
            );

            if (!servico) {
                return res.status(404).json({
                    message: 'Serviço não encontrado'
                });
            }

            res.status(200).json({
                message: 'Serviço desativado com sucesso'
            });

        } catch (error) {
            res.status(500).json({
                message: 'Erro ao desativar serviço',
                error: error.message
            });
        }
    }
}

export default ServicoController;