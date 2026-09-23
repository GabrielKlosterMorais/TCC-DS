import Cliente from '../models/Cliente.js';
import Pet from '../models/Pet.js';

class ClienteController {

  static async create(req, res) {
    try {
      const {
        nomeCliente,
        telefone,
        email,
        endereco,
        senha
      } = req.body;

      if (
        !nomeCliente ||
        !telefone ||
        !email ||
        !endereco ||
        !senha
      ) {
        return res.status(400).json({
          message: 'Preencha todos os campos obrigatórios'
        });
      }

      const emailExistente = await Cliente.findOne({ email });

      if (emailExistente) {
        return res.status(400).json({
          message: 'Já existe um cliente com este e-mail'
        });
      }

      const novoCliente = await Cliente.create({
        nomeCliente,
        telefone,
        email,
        endereco,
        senha,
        ativo: true,
        tipo: 'cliente'
      });

      return res.status(201).json({
        message: 'Cliente criado com sucesso',
        data: novoCliente
      });

    } catch (error) {
      console.error('Erro ao criar cliente:', error);

      return res.status(500).json({
        message: 'Erro ao criar cliente',
        error: error.message
      });
    }
  }


  static async login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        message: 'E-mail e senha são obrigatórios'
      });
    }

    const cliente = await Cliente.findOne({
      email: email.trim(),
      ativo: true
    });

    if (!cliente) {
      return res.status(401).json({
        message: 'E-mail ou senha incorretos'
      });
    }

    if (cliente.senha !== senha) {
      return res.status(401).json({
        message: 'E-mail ou senha incorretos'
      });
    }

    // Converte o documento do MongoDB para objeto normal
    const usuario = cliente.toObject();

    // Não envia a senha para o frontend
    delete usuario.senha;

    return res.status(200).json({
      message: 'Login realizado com sucesso',
      data: usuario
    });

  } catch (error) {
    console.error('Erro ao realizar login:', error);

    return res.status(500).json({
      message: 'Erro ao realizar login',
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
      console.error('Erro ao buscar clientes:', error);

      return res.status(500).json({
        message: 'Erro ao buscar clientes',
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
      console.error('Erro ao buscar todos os clientes:', error);

      return res.status(500).json({
        message: 'Erro ao buscar todos os clientes',
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
      console.error('Erro ao buscar cliente:', error);

      return res.status(500).json({
        message: 'Erro ao buscar cliente',
        error: error.message
      });
    }
  }


  static async update(req, res) {
    try {
      const { id } = req.params;

      const {
        nomeCliente,
        telefone,
        email,
        endereco,
        senha
      } = req.body;

      const cliente = await Cliente.findOne({
        _id: id,
        ativo: true
      });

      if (!cliente) {
        return res.status(404).json({
          message: 'Cliente não encontrado'
        });
      }

      const dadosAtualizados = {};

      if (nomeCliente !== undefined) {
        dadosAtualizados.nomeCliente = nomeCliente;
      }

      if (telefone !== undefined) {
        dadosAtualizados.telefone = telefone;
      }

      if (email !== undefined) {
        dadosAtualizados.email = email;
      }

      if (endereco !== undefined) {
        dadosAtualizados.endereco = endereco;
      }

      if (senha !== undefined) {
        dadosAtualizados.senha = senha;
      }

      const clienteAtualizado = await Cliente.findOneAndUpdate(
        {
          _id: id,
          ativo: true
        },
        dadosAtualizados,
        {
          new: true
        }
      );

      return res.status(200).json({
        message: 'Cliente atualizado com sucesso',
        data: clienteAtualizado
      });

    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);

      return res.status(500).json({
        message: 'Erro ao atualizar cliente',
        error: error.message
      });
    }
  }


  static async delete(req, res) {
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

      await Pet.updateMany(
        {
          clienteId: id,
          ativo: true
        },
        {
          ativo: false
        }
      );

      const clienteDesativado = await Cliente.findOneAndUpdate(
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

      return res.status(200).json({
        message: 'Cliente e pets desativados com sucesso',
        data: clienteDesativado
      });

    } catch (error) {
      console.error('Erro ao desativar cliente:', error);

      return res.status(500).json({
        message: 'Erro ao desativar cliente',
        error: error.message
      });
    }
  }


  static async validarSenha(req, res) {
    try {
      const { id, senha } = req.body;

      if (!id || !senha) {
        return res.status(400).json({
          message: 'ID e senha são obrigatórios'
        });
      }

      const cliente = await Cliente.findOne({
        _id: id,
        ativo: true
      });

      if (!cliente) {
        return res.status(404).json({
          message: 'Cliente não encontrado'
        });
      }

      if (cliente.senha !== senha) {
        return res.status(401).json({
          message: 'Senha incorreta'
        });
      }

      return res.status(200).json({
        message: 'Senha válida'
      });

    } catch (error) {
      console.error('Erro ao validar senha:', error);

      return res.status(500).json({
        message: 'Erro ao validar senha',
        error: error.message
      });
    }
  }
}

export default ClienteController;