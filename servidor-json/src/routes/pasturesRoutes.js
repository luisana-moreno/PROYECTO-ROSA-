import express from 'express';
import {
  getPastures,
  addPasture,
  updatePasture,
  deletePasture
} from '../controllers/pasturesController.js';

const router = express.Router();

router.get('/pastures', getPastures);
router.post('/pastures', addPasture);
router.put('/pastures/:id', updatePasture);
router.delete('/pastures/:id', deletePasture);

export default router;