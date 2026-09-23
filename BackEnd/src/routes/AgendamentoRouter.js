import express from 'express'
import AgendamentoController from '../controllers/AgendamentoController.js'

const router = express.Router()


// =========================================================
// CRIAR AGENDAMENTO
// =========================================================

router.post(
  '/',
  AgendamentoController.create
)


// =========================================================
// LISTAR TODOS
// =========================================================

router.get(
  '/',
  AgendamentoController.getAll
)


// =========================================================
// BUSCAR POR ID
// =========================================================

router.get(
  '/:id',
  AgendamentoController.getById
)


// =========================================================
// CANCELAR PELO ADMINISTRADOR
// =========================================================

router.put(
  '/:id/cancelar/admin',
  AgendamentoController.cancelarAdmin
)


// =========================================================
// CANCELAR PELO CLIENTE
// =========================================================

router.put(
  '/:id/cancelar/cliente',
  AgendamentoController.cancelarCliente
)


// =========================================================
// ATUALIZAR AGENDAMENTO
// =========================================================

router.put(
  '/:id',
  AgendamentoController.update
)


// =========================================================
// DELETAR
// =========================================================

router.delete(
  '/:id',
  AgendamentoController.delete
)


export default router   
