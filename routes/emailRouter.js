const express = require('express');
const router = express.Router();
const birthdayController = require('../controller/birthDayController');

router.post('/', birthdayController.birthday)

module.exports=router;