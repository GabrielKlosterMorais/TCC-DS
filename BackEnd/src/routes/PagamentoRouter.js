import express from 'express';
import PagamentoController from '../controllers/PagamentoCrontroller.js';

const router = express.Router();

router.post('/', PagamentoController.create);
router.get('/', PagamentoController.getAll);
router.get('/:id', PagamentoController.getById);
router.put('/:id', PagamentoController.update);
router.delete('/:id', PagamentoController.delete);

export default router;