import express from 'express';
import {
  getClients,
  addClient,
  updateClient,
  deleteClient
} from '../controllers/clientController.js';

const router = express.Router();

router.get('/clients', getClients);
router.post('/clients', addClient);
router.put('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);

export default router;