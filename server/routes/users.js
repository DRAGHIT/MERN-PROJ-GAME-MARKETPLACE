const express = require('express');
const router = express.Router();
const { getUserProfile, updateMyProfile } = require('../controllers/userController');
const { updateProfileValidation } = require('../middleware/validation');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/users/profile/:userId
router.get('/profile/:userId', getUserProfile);

// @route   PUT /api/users/me
router.put('/me', authMiddleware, updateProfileValidation, updateMyProfile);

module.exports = router;
