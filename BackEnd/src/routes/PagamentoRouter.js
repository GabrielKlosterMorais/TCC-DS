import express from 'express';
// Importa o Express para criar e configurar as rotas.


import PagamentoController from '../controllers/PagamentoCrontroller.js';
// Importa o Controller responsável pelas operações
// relacionadas aos pagamentos.


// Cria um Router do Express.
// Ele permite organizar as rotas de pagamento
// separadamente do arquivo principal do servidor.
const router = express.Router();


// POST /Pagamento
// Cria um novo pagamento.
router.post('/', PagamentoController.create);


// GET /Pagamento
// Busca todos os pagamentos.
router.get('/', PagamentoController.getAll);


// GET /Pagamento/:id
// Busca um pagamento específico pelo ID.
router.get('/:id', PagamentoController.getById);


// PUT /Pagamento/:id
// Atualiza um pagamento específico pelo ID.
router.put('/:id', PagamentoController.update);


// DELETE /Pagamento/:id
// Desativa ou exclui um pagamento específico,
// dependendo da lógica implementada no Controller.
router.delete('/:id', PagamentoController.delete);


// Exporta o Router para que ele possa ser utilizado
// pelo arquivo principal do servidor.
export default router;