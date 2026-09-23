import express from 'express';
// Importa o Express para criar e configurar as rotas.


import ClienteController from '../controllers/ClienteController.js';
// Importa o Controller responsável pelas operações
// relacionadas aos clientes.


const router = express.Router();
// Cria um Router do Express.
// Ele permite organizar as rotas de clientes
// separadamente do arquivo principal do servidor.


// POST /Cliente
// Cria um novo cliente.
router.post('/', ClienteController.create);


// POST /Cliente/login
// Realiza o login de um cliente.
router.post('/login', ClienteController.login);


// GET /Cliente
// Busca os clientes através do método getAll.
router.get('/', ClienteController.getAll);


// GET /Cliente/todos
// Busca todos os clientes através do método getTodos.
router.get('/todos', ClienteController.getTodos);


// GET /Cliente/:id
// Busca um cliente específico pelo ID.
// O :id é um parâmetro recebido pela URL.
router.get('/:id', ClienteController.getById);


// PUT /Cliente/:id
// Atualiza os dados de um cliente específico.
router.put('/:id', ClienteController.update);


// DELETE /Cliente/:id
// Desativa ou exclui um cliente específico,
// dependendo da lógica implementada no Controller.
router.delete('/:id', ClienteController.delete);


// POST /Cliente/validar-senha
// Executa a validação da senha através
// do método validarSenha do Controller.
router.post('/validar-senha', ClienteController.validarSenha);


// Exporta o Router para que ele possa ser utilizado
// pelo arquivo principal do servidor.
export default router;