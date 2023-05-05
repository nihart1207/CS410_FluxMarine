const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {adminAuthentication, authenticationMiddleware} = require('../middleware/auth')


router.post('/login', userController.checkLogin);
//only admin can create new users
router.post('/user', adminAuthentication , userController.createUser);
// only admin can view the users
router.get('/users', adminAuthentication , userController.getAllUsers);
// only admin can delete users
router.delete('/user/:_id', adminAuthentication , userController.deleteUserById);
// user needs to be logged in and has to send the cookie also.
router.put('/user', authenticationMiddleware ,userController.updateUserByEmail);

module.exports = router;
