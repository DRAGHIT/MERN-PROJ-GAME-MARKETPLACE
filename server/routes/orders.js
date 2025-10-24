const express = require('express');
const router = express.Router();
const { purchaseGame } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/orders/purchase/:gameId
router.post('/purchase/:gameId', authMiddleware, purchaseGame);

module.exports = router;
