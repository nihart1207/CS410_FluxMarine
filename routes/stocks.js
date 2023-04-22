const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('/stocks', stockController.getAllStocks);
router.post('/stock', stockController.createNewStock);
router.get('/stock/:id' , stockController.getStockByID);
router.put('/stock/:id' , stockController.updateStockById);
router.delete('/stock/:id', stockController.deleteStockByID);

module.exports = router;