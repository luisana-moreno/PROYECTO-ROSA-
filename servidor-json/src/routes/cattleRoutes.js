import express from 'express';
import {
  getCattle,
  addCattle,
  updateCattle,
  deleteCattle
} from '../controllers/cattleController.js';

const router = express.Router();

router.get('/cattle', getCattle);
router.post('/cattle', addCattle);
router.put('/cattle/:id', updateCattle);
router.delete('/cattle/:id', deleteCattle);

export default router;