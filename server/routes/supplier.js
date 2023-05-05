const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const {adminAuthentication} = require('../middleware/auth')

router.get('/suppliers', supplierController.getAllSuppliers);
router.post('/supplier',  adminAuthentication ,supplierController.addNewSupplier);
router.put('/supplier/:_id', adminAuthentication ,supplierController.updateSupplierById);
router.delete('/supplier/:_id', adminAuthentication ,supplierController.deleteSupplierById);
router.get('/supplier/:_id', supplierController.getSupplierById);

module.exports = router;