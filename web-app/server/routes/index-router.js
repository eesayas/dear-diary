const express = require('express');
const router = express.Router();
const { registerUser, loginUser, createPost } = require('../controllers/index-controller');

//this route signs up/registers a user
router.post('/register', registerUser);

//this route signs in/logins a user
router.post('/login', loginUser);

//this route will create a post by user
router.post('/create', createPost);

module.exports = router;