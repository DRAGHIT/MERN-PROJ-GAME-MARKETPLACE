const express = require('express');
const router = express.Router();
const { 
  getGames, 
  getGameById, 
  createGame, 
  updateGame, 
  deleteGame 
} = require('../controllers/gameController');
const { createGameValidation, updateGameValidation } = require('../middleware/validation');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/games
router.get('/', getGames);

// @route   GET /api/games/:id
router.get('/:id', getGameById);

// @route   POST /api/games
router.post('/', authMiddleware, createGameValidation, createGame);

// @route   PUT /api/games/:id
router.put('/:id', authMiddleware, updateGameValidation, updateGame);

// @route   DELETE /api/games/:id
router.delete('/:id', authMiddleware, deleteGame);

module.exports = router;
