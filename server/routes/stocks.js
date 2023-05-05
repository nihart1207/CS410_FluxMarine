const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const {adminAuthentication, userRestrictionAuthentication} = require('../middleware/auth')

router.get('/stocks', stockController.getAllStocks);
router.post('/stock', userRestrictionAuthentication ,stockController.createNewStock);
router.get('/stock/:_id' , stockController.getStockByID);
router.put('/stock/:_id' , userRestrictionAuthentication , stockController.updateStockById);
router.delete('/stock/:_id', adminAuthentication ,stockController.deleteStockByID);

module.exports = router;