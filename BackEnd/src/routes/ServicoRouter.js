import express from 'express';
import ServicoController from '../controllers/ServicoController.js';

const router = express.Router();

router.post('/', ServicoController.create);
router.get('/', ServicoController.getAll);
router.get('/:id', ServicoController.getById);
router.put('/:id', ServicoController.update);
router.delete('/:id', ServicoController.delete);

export default router;