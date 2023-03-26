const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/login', userController.checkLogin);
router.post('/signup', userController.createUser);
router.get('/users', userController.getAllUsers);

router.delete('/user/', userController.deleteUserByIdOrEmail);
router.put('/user/', userController.updateUserByIdOrEmail);

module.exports = router;
