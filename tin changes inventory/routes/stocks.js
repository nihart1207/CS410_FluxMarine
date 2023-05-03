const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('/stocks', stockController.getAllStocks);
router.post('/stock', stockController.createNewStock);
router.get('/stock/:_id' , stockController.getStockByID);
router.put('/stock/:_id' , stockController.updateStockById);
router.delete('/stock/:_id', stockController.deleteStockByID);

module.exports = router;