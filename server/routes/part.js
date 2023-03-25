const express = require('express');
const router = express.Router();
const partController = require('../controllers/partController');

router.get('/parts', partController.getAllParts);
router.post('/part/add', partController.addNewPart);

module.exports = router;