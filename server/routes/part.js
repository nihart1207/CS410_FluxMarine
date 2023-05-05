const express = require('express');
const router = express.Router();
const partController = require('../controllers/partController');
const {adminAuthentication} = require('../middleware/auth')

router.get('/parts', partController.getAllParts);
router.post('/part', adminAuthentication , partController.addNewPart);
router.delete('/part/:_id', adminAuthentication ,partController.deletePartById);
router.get('/part/:_id', partController.getPartById);
router.put('/part/:_id', adminAuthentication ,partController.updatePartById);

module.exports = router;