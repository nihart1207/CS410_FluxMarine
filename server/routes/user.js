const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/login', userController.checkLogin);
router.post('/signup', userController.createUser);
router.get('/users', userController.getAllUsers);


module.exports = router;
