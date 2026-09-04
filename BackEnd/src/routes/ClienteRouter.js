import express from 'express';
import ClienteController from '../controllers/ClienteController.js';

const router = express.Router();

router.post('/', ClienteController.create);
router.post('/login', ClienteController.login);
router.get('/', ClienteController.getAll);

router.get('/todos', ClienteController.getTodos);

router.get('/:id', ClienteController.getById);
router.put('/:id', ClienteController.update);
router.delete('/:id', ClienteController.delete);

export default router;