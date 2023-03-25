const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

router.get('/supplier/all', supplierController.getAllSuppliers);
router.post('/supplier/add', supplierController.addNewSupplier);

module.exports = router;