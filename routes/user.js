const express = require('express');

const router = express.Router();

const { loginController, registerController } = require('../controllers/user');

//Post Request for Login
router.post('/login', loginController);

//Post Request for Register
router.post('/register', registerController);

module.exports = router;