import Pet from '../models/Pet.js';

class PetController {

  // Cadastra um novo pet
  static async create(req, res) {
    try {
      // Pega os dados enviados pelo frontend/Postman
      const {
        nome,
        especie,
        raca,
        idade,
        sexo,
        peso,
        observacoes,
        clienteId,
        img
      } = req.body;

      // Verifica se os campos obrigatórios foram preenchidos
      if (
        !nome ||
        !especie ||
        !raca ||
        !idade ||
        !sexo ||
        !peso ||
        !clienteId
      ) {
        return res.status(400).json({
          message:
            'Dados inválidos. Certifique-se de enviar nome, espécie, raça, idade, sexo, peso e clienteId.'
        });
      }

      // Cria o pet no banco de dados
      const novoPet = await Pet.create({
        nome,
        especie,
        raca,
        idade,
        sexo,
        peso,
        observacoes,
        clienteId,
        img,
        ativo: true
      });

      // Retorna o pet criado
      return res.status(201).json({
        message: 'Pet criado com sucesso',
        data: novoPet
      });

    } catch (error) {
      console.error('Erro ao criar pet:', error);

      return res.status(500).json({
        message: 'Erro ao criar pet',
        error: error.message
      });
    }
  }


  // Lista todos os pets ativos
  static async getAll(req, res) {
    try {
      // Busca somente pets que estão ativos
      const pets = await Pet.find({
        ativo: true
      });

      return res.status(200).json({
        data: pets
      });

    } catch (error) {
      console.error('Erro ao buscar pets:', error);

      return res.status(500).json({
        message: 'Erro ao buscar pets',
        error: error.message
      });
    }
  }


  // Busca um pet pelo ID
  static async getById(req, res) {
    try {
      // Pega o ID enviado pela URL
      const { id } = req.params;

      // Procura somente pets ativos
      const pet = await Pet.findOne({
        _id: id,
        ativo: true
      });

      // Caso o pet não seja encontrado
      if (!pet) {
        return res.status(404).json({
          message: 'Pet não encontrado'
        });
      }

      return res.status(200).json({
        data: pet
      });

    } catch (error) {
      console.error('Erro ao buscar pet:', error);

      return res.status(500).json({
        message: 'Erro ao buscar pet',
        error: error.message
      });
    }
  }


  // Atualiza os dados de um pet
  static async update(req, res) {
    try {
      // Pega o ID do pet
      const { id } = req.params;

      // Pega os dados enviados
      const {
        nome,
        especie,
        raca,
        idade,
        sexo,
        peso,
        observacoes,
        clienteId,
        img
      } = req.body;

      // Verifica se o pet existe e está ativo
      const pet = await Pet.findOne({
        _id: id,
        ativo: true
      });

      // Caso o pet não seja encontrado
      if (!pet) {
        return res.status(404).json({
          message: 'Pet não encontrado'
        });
      }

      // Cria um objeto com os dados que serão atualizados
      const dadosAtualizados = {};

      if (nome !== undefined) {
        dadosAtualizados.nome = nome;
      }

      if (especie !== undefined) {
        dadosAtualizados.especie = especie;
      }

      if (raca !== undefined) {
        dadosAtualizados.raca = raca;
      }

      if (idade !== undefined) {
        dadosAtualizados.idade = idade;
      }

      if (sexo !== undefined) {
        dadosAtualizados.sexo = sexo;
      }

      if (peso !== undefined) {
        dadosAtualizados.peso = peso;
      }

      if (observacoes !== undefined) {
        dadosAtualizados.observacoes = observacoes;
      }

      if (clienteId !== undefined) {
        dadosAtualizados.clienteId = clienteId;
      }

      if (img !== undefined) {
        dadosAtualizados.img = img;
      }

      // Atualiza o pet
      const petAtualizado = await Pet.findOneAndUpdate(
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
        message: 'Pet atualizado com sucesso',
        data: petAtualizado
      });

    } catch (error) {
      console.error('Erro ao atualizar pet:', error);

      return res.status(500).json({
        message: 'Erro ao atualizar pet',
        error: error.message
      });
    }
  }


  // Desativa um pet
  static async delete(req, res) {
    try {
      // Pega o ID do pet
      const { id } = req.params;

      // Procura o pet e verifica se ele está ativo
      const pet = await Pet.findOneAndUpdate(
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

      // Caso o pet não seja encontrado
      if (!pet) {
        return res.status(404).json({
          message: 'Pet não encontrado'
        });
      }

      // Retorna mensagem de sucesso
      return res.status(200).json({
        message: 'Pet desativado com sucesso',
        data: pet
      });

    } catch (error) {
      console.error('Erro ao desativar pet:', error);

      return res.status(500).json({
        message: 'Erro ao desativar pet',
        error: error.message
      });
    }
  }
}

export default PetController;