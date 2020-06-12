const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/index-controller');

//this route signs up/registers a user
router.post('/register', registerUser);

//this route signs in/logins a user
router.post('/login', loginUser);

module.exports = router;