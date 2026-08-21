import Cliente from '../models/Cliente.js';

class ClienteController {
    static async create(req, res) {
        try {
            const { nomeCliente,  email, telefone, endereco, senha } = req.body;

            if (!nomeCliente || !email || !telefone || !endereco || !senha) {
                return res.status(400).json({
                    message: "Dados inválidos. Certifique-se de enviar nomeCliente,  email, telefone, endereço e senha."
                });
            }

            const clienteData = {
                nomeCliente,
                email,
                telefone,
                endereco,
                senha
            };

            const newCliente = await Cliente.create(clienteData);

            return res.status(201).json({
                message: 'Cliente criado com sucesso',
                data: newCliente
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao criar cliente',
                error: error.message
            });
        }
    }

    static async getAll(req, res) {
        try {
            const clientes = await Cliente.find();

            return res.status(200).json({
                data: clientes
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao encontrar clientes',
                error: error.message
            });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;

            const cliente = await Cliente.findById(id);

            if (!cliente) {
                return res.status(404).json({
                    message: 'Cliente não encontrado'
                });
            }

            return res.status(200).json({
                data: cliente
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao encontrar cliente',
                error: error.message
            });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { nomeCliente,  email, telefone, endereco } = req.body;

            const updatedData = {
                nomeCliente,
                
                email,
                telefone,
                endereco
            };

            const updatedCliente = await Cliente.findByIdAndUpdate(
                id,
                updatedData,
                { new: true }
            );

            if (!updatedCliente) {
                return res.status(404).json({
                    message: 'Cliente não encontrado'
                });
            }

            return res.status(200).json({
                message: 'Cliente atualizado com sucesso',
                data: updatedCliente
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao atualizar cliente',
                error: error.message
            });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;

            const deletedCliente = await Cliente.findByIdAndDelete(id);

            if (!deletedCliente) {
                return res.status(404).json({
                    message: 'Cliente não encontrado'
                });
            }

            return res.status(200).json({
                message: 'Cliente deletado com sucesso'
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao deletar cliente',
                error: error.message
            });
        }
    }

    static async login(req, res) {
        const { email, senha } = req.body;

        try {
            const cliente = await Cliente.findOne({ email });

            if (!cliente) {
                return res.status(400).json({
                    message: 'E-mail ou senha incorretos.'
                });
            }

            if (cliente.senha !== senha) {
                return res.status(400).json({
                    message: 'E-mail ou senha incorretos.'
                });
            }

            return res.status(200).json({
                id: cliente._id,
                nome: cliente.nomeCliente,
                email: cliente.email,
                telefone: cliente.telefone,
                endereco: cliente.endereco
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro interno no servidor ao tentar logar.',
                error: error.message
            });
        }
    }
}

export default ClienteController;

