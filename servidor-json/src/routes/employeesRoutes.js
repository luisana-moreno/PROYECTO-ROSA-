import express from 'express';
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from '../controllers/employeesController.js';

const router = express.Router();

router.get('/employees', getEmployees);
router.post('/employees', addEmployee);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

export default router;