const express= require('express')
const router = express.Router();
const authController = require('../controller/authController')

router.post('/signup', authController.createUsers);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logout);
module.exports=router;