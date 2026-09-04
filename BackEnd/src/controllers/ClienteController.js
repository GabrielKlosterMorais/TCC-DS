import Cliente from '../models/Cliente.js';

class ClienteController {
    static async create(req, res) {
        try {
            const {
                nomeCliente,
                email,
                telefone,
                endereco,
                senha,
                tipo
            } = req.body;

            if (!nomeCliente || !email || !telefone || !endereco || !senha) {
                return res.status(400).json({
                    message: "Dados inválidos. Certifique-se de enviar nomeCliente, email, telefone, endereço e senha."
                });
            }

            const clienteData = {
                nomeCliente,
                email,
                telefone,
                endereco,
                senha,
                tipo: tipo || 'cliente'
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
        const clientes = await Cliente.find({
            ativo: true
        });

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

static async getTodos(req, res) {
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

            const cliente = await Cliente.findOne({
                _id: id,
                ativo: true
            });

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

            const {
                nomeCliente,
                email,
                telefone,
                endereco,
                tipo
            } = req.body;

            const updatedData = {
                nomeCliente,
                email,
                telefone,
                endereco,
                tipo
            };

            const updatedCliente = await Cliente.findOneAndUpdate(
                {
                    _id: id,
                    ativo: true
                },
                updatedData,
                {
                    new: true
                }
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

            const deletedCliente = await Cliente.findOneAndUpdate(
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

            if (!deletedCliente) {
                return res.status(404).json({
                    message: 'Cliente não encontrado'
                });
            }

            return res.status(200).json({
                message: 'Cliente desativado com sucesso',
                data: deletedCliente
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao desativar cliente',
                error: error.message
            });
        }
    }

    static async login(req, res) {
        const { email, senha } = req.body;

        try {
            const cliente = await Cliente.findOne({
                email,
                ativo: true
            });

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
                endereco: cliente.endereco,
                tipo: cliente.tipo
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