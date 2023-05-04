const express = require('express');
const router = express.Router();
const partController = require('../controllers/partController');

router.get('/parts', partController.getAllParts);
router.post('/part', partController.addNewPart);
router.get('/part', partController.getPartByName);
router.delete('/part/:_id', partController.deletePartById);
router.get('/part/:_id', partController.getPartById);
router.put('/part/:_id',  partController.updatePartById);

module.exports = router;