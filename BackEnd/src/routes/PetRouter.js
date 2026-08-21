import express from 'express';
import PetController from '../controllers/PetController.js';

const router = express.Router();

router.post('/', PetController.create);
router.get('/', PetController.getAll);
router.get('/:id', PetController.getById);
router.put('/:id', PetController.update);
router.delete('/:id', PetController.delete);

export default router;