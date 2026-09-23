// Importa o Express para criar e configurar as rotas.
import express from 'express';


// Importa o Controller responsável pelas operações
// relacionadas aos serviços.
import ServicoController from '../controllers/ServicoController.js';


// Cria um Router do Express.
// Ele permite organizar as rotas de serviços
// separadamente do arquivo principal do servidor.
const router = express.Router();


// POST /Servico
// Cria um novo serviço.
router.post('/', ServicoController.create);


// GET /Servico
// Busca todos os serviços ativos.
router.get('/', ServicoController.getAll);


// GET /Servico/:id
// Busca um serviço específico pelo ID.
// O :id é um parâmetro recebido pela URL.
router.get('/:id', ServicoController.getById);


// PUT /Servico/:id
// Atualiza os dados de um serviço específico.
router.put('/:id', ServicoController.update);


// DELETE /Servico/:id
// Desativa um serviço específico.
router.delete('/:id', ServicoController.delete);


// Exporta o Router para que ele possa ser utilizado
// pelo arquivo principal do servidor.
export default router;