import Pet from '../models/Pet.js';

class PetController {

    static async create(req, res) {
        try {
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

            if (!nome || !especie || !raca || !idade || !sexo || !peso || !clienteId) {
                return res.status(400).json({
                    message: 'Dados inválidos. Envie nome, espécie, raça, idade, sexo, peso e clienteId.'
                });
            }

            const newPet = await Pet.create({
                nome,
                especie,
                raca,
                idade,
                sexo,
                peso,
                observacoes,
                clienteId,
                img
            });

            return res.status(201).json({
                message: 'Pet criado com sucesso',
                data: newPet
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao criar pet',
                error: error.message
            });
        }
    }

    static async getAll(req, res) {
        try {
            const pets = await Pet.find({ ativo: true });

            return res.status(200).json({ data: pets });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao encontrar pets',
                error: error.message
            });
        }
    }

    static async getById(req, res) {
        try {
            const pet = await Pet.findOne({
                _id: req.params.id,
                ativo: true
            });

            if (!pet) {
                return res.status(404).json({
                    message: 'Pet não encontrado'
                });
            }

            return res.status(200).json({ data: pet });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao encontrar pet',
                error: error.message
            });
        }
    }

    static async update(req, res) {
        try {
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

            const updatedData = {
                nome,
                especie,
                raca,
                idade,
                sexo,
                peso,
                observacoes,
                clienteId
            };

            if (img !== undefined) {
                updatedData.img = img;
            }

            const updatedPet = await Pet.findOneAndUpdate(
                {
                    _id: req.params.id,
                    ativo: true
                },
                updatedData,
                { new: true }
            );

            if (!updatedPet) {
                return res.status(404).json({
                    message: 'Pet não encontrado'
                });
            }

            return res.status(200).json({
                message: 'Pet atualizado com sucesso',
                data: updatedPet
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao atualizar pet',
                error: error.message
            });
        }
    }

    static async delete(req, res) {
        try {
            const deletedPet = await Pet.findOneAndUpdate(
                {
                    _id: req.params.id,
                    ativo: true
                },
                { ativo: false },
                { new: true }
            );

            if (!deletedPet) {
                return res.status(404).json({
                    message: 'Pet não encontrado'
                });
            }

            return res.status(200).json({
                message: 'Pet desativado com sucesso',
                data: deletedPet
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao desativar pet',
                error: error.message
            });
        }
    }
}

export default PetController;