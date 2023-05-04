const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

router.get('/suppliers', supplierController.getAllSuppliers);
router.post('/supplier', supplierController.addNewSupplier);
router.put('/supplier/:_id', supplierController.updateSupplierById);
router.delete('/suppler/:_id', supplierController.deleteSupplierById);
router.get('/supplier/:id', supplierController.getSupplierById);


module.exports = router;