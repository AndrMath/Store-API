import express from 'express';
import productsController from '../controllers/products.controller.js';

const router = express.Router();

router.post('/new', productsController.newProduct)
router.get('/', productsController.returnProducts)
router.get('/:id', productsController.returnProduct)
router.delete('/:id', productsController.deleteProduct)
router.put('/:id', productsController.updateProduct)

export default router;