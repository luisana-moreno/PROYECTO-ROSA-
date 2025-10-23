const express = require('express');
const router = express.Router();
const milkProductionController = require('../controllers/milkProductionController');

// Rutas para la producción de leche
router.get('/milk', milkProductionController.getMilkRecords);
router.post('/milk', milkProductionController.addMilkRecord);
router.put('/milk/:id', milkProductionController.updateMilkRecord);
router.delete('/milk/:id', milkProductionController.deleteMilkRecord);

module.exports = router;