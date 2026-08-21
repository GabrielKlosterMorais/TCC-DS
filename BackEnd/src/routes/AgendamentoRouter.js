import express from 'express';
import AgendamentoController from '../controllers/AgendamentoController.js';

const router = express.Router();

router.post('/', AgendamentoController.create);
router.get('/', AgendamentoController.getAll);
router.get('/:id', AgendamentoController.getById);
router.put('/:id', AgendamentoController.update);
router.delete('/:id', AgendamentoController.delete);

export default router;