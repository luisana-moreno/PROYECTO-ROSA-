import express from 'express';
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser
} from '../controllers/usersController.js';

const router = express.Router();

router.get('/users', getUsers);
router.post('/users', addUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;