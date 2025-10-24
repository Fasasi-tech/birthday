const express = require('express');

const router = express.Router();
const userController = require('../controller/userController');
const {AuthorizeUser} = require('../middleware/authmiddleware')
const {restrict} = require('../controller/authController')
const authController = require('../controller/authController')

router.get('/', AuthorizeUser, authController.verifyUserStatus,  restrict('admin'), userController.getAllUsers )
router.get('/:id', AuthorizeUser, authController.verifyUserStatus, restrict('admin'), userController.getSingleUser)
router.patch('/deactivate-user/:id', AuthorizeUser, authController.verifyUserStatus, restrict('admin'), userController.deactivateUser)
router.patch('/reactivate-user/:id', AuthorizeUser, authController.verifyUserStatus, restrict('admin'), userController.reactivateUser)

module.exports= router;