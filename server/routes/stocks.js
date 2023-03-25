const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('stock/all', stockController.getAllStocks);

module.exports = router;