import Pet from '../models/Pet.js';

class PetController {
    static async create(req, res) {
        try {
            const {nome,
                especie,
                raca,
                idade,
                sexo,
                peso,
                observacoes,
                clienteId
            } = req.body;

            if (!nome || !especie || !raca || !idade || !sexo || !peso || !clienteId) {
                return res.status(400).json({
                    message: "Dados inválidos. Certifique-se de enviar nome, espécie, raça, idade, sexo, peso e clienteId."
                });
            }

            const petData = {
                nome,
                especie,
                raca,
                idade,
                sexo,
                peso,
                observacoes,
                clienteId
            };

            const newPet = await Pet.create(petData);

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
            const pets = await Pet.find();

            return res.status(200).json({
                data: pets
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao encontrar pets',
                error: error.message
            });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;

            const pet = await Pet.findById(id);

            if (!pet) {
                return res.status(404).json({
                    message: 'Pet não encontrado'
                });
            }

            return res.status(200).json({
                data: pet
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao encontrar pet',
                error: error.message
            });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;

            const {
                nome,
                especie,
                raca,
                idade,
                sexo,
                peso,
                observacoes,
                clienteId
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

            const updatedPet = await Pet.findByIdAndUpdate(
                id,
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
            const { id } = req.params;

            const deletedPet = await Pet.findByIdAndDelete(id);

            if (!deletedPet) {
                return res.status(404).json({
                    message: 'Pet não encontrado'
                });
            }

            return res.status(200).json({
                message: 'Pet deletado com sucesso'
            });

        } catch (error) {
            return res.status(500).json({
                message: 'Erro ao deletar pet',
                error: error.message
            });
        }
    }
}

export default PetController;

