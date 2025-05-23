const express = require('express');
const router = express.Router();
const registerUser  = require('../controllers/authController');
const multer = require('multer');

const upload = multer(); 

router.post('/register', upload.none(), registerUser.registerUser);
router.post('/login', upload.none(), registerUser.loginUser);

module.exports = router;
