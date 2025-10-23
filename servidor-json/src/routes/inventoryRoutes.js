import express from 'express';
import {
  getInventoryItems,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem
} from '../controllers/inventoryController.js';

const router = express.Router();

router.get('/inventory', getInventoryItems);
router.post('/inventory', addInventoryItem);
router.put('/inventory/:id', updateInventoryItem);
router.delete('/inventory/:id', deleteInventoryItem);

export default router;