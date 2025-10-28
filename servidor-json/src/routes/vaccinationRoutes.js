import express from 'express';
import {
  getVaccinationRecords,
  addVaccinationRecord,
  updateVaccinationRecord,
  deleteVaccinationRecord
} from '../controllers/vaccinationController.js';

const router = express.Router();

router.get('/vaccinations', getVaccinationRecords);
router.post('/vaccinations', addVaccinationRecord);
router.put('/vaccinations/:id', updateVaccinationRecord);
router.delete('/vaccinations/:id', deleteVaccinationRecord);

export default router;