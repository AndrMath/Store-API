import express from 'express';
import suppliersController from '../controllers/suppliers.controller.js';

const router = express.Router();

router.post('/new', suppliersController.newSupplier)
router.get('/', suppliersController.returnSuppliers)
router.get('/:id', suppliersController.returnSupplier)
router.delete('/:id', suppliersController.deleteSupplier)
router.put('/:id', suppliersController.updateSupplier)

export default router;