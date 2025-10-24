const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../middleware/validation');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/auth/register
router.post('/register', registerValidation, register);

// @route   POST /api/auth/login
router.post('/login', loginValidation, login);

// @route   GET /api/auth/me
router.get('/me', authMiddleware, getMe);

module.exports = router;
