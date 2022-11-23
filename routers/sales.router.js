import express from 'express';
import salesController from '../controllers/sales.controller.js';

const router = express.Router();

router.post('/new', salesController.newSale)
router.get('/', salesController.returnSales)
router.get('/:id', salesController.returnSale)
router.delete('/:id', salesController.deleteSale)
router.put('/:id', salesController.updateSale)

export default router;