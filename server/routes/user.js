const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get a single user by email
router.get('/:email', userController.getUserByEmail);
router.post('/user', userController.createUser);
router.post('/api/login', userController.checkLogin);

module.exports = router;
