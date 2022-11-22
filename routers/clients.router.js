import express from 'express';
import { newClient, returnClients, returnClient, deleteClient, updateClient } from '../controllers/clients.controller.js';

const router = express.Router();

router.post('/new', newClient)
router.get('/', returnClients)
router.get('/:id', returnClient)
router.delete('/:id', deleteClient)
router.put('/:id', updateClient)

export default router;