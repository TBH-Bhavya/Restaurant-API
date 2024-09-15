const express = require('express');
const { registerController, loginController } = require('../controller/authController');

const router = express.Router();

// Register
router.route('/register').post(registerController)

// Login
router.route('/login').post(loginController)
module.exports = router;