// Importa o Express para criar e configurar as rotas.
import express from 'express';


// Importa o Controller responsável pelas operações
// relacionadas aos pets.
import PetController from '../controllers/PetController.js';


// Cria um Router do Express.
// Ele permite organizar as rotas de pets
// separadamente do arquivo principal do servidor.
const router = express.Router();


// POST /Pet
// Cria um novo pet.
router.post('/', PetController.create);


// GET /Pet
// Busca todos os pets ativos.
router.get('/', PetController.getAll);


// GET /Pet/:id
// Busca um pet específico pelo ID.
// O :id é um parâmetro recebido pela URL.
router.get('/:id', PetController.getById);


// PUT /Pet/:id
// Atualiza os dados de um pet específico.
router.put('/:id', PetController.update);


// DELETE /Pet/:id
// Desativa um pet específico.
router.delete('/:id', PetController.delete);


// Exporta o Router para que ele possa ser utilizado
// pelo arquivo principal do servidor.
export default router;