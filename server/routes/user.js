const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/login', userController.checkLogin);
router.post('/signup', userController.createUser);
router.get('/users', userController.getAllUsers);

router.delete('/user/:id', userController.deleteUserById);
router.put('/user/:id', userController.updateUserById);

router.put('/user/:email', userController.updateUserByEmail);
router.delete('/user/:email' , userController.deleteUserByEmail);

module.exports = router;
