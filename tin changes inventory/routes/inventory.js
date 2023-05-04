const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/inventory', inventoryController.getAllInventory);
router.post('/inventory', inventoryController.createInventory);
router.delete('/inventory/:id', inventoryController.delInventory);
router.get('/inventory/:id', inventoryController.getInventory);
router.put('/inventory/:id',  inventoryController.editInventory);

module.exports = router;