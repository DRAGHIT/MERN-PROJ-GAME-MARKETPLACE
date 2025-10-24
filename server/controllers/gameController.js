const Game = require('../models/Game');
const User = require('../models/User');

// @desc    Get all games with filtering and sorting
// @route   GET /api/games
// @access  Public
const getGames = async (req, res) => {
  try {
    const { genre, platform, sort } = req.query;
    
    // Build filter object
    const filter = {};
    if (genre) filter.genre = genre;
    if (platform) filter.platform = platform;

    // Build sort object
    let sortOption = {};
    switch (sort) {
      case 'price_asc':
        sortOption = { price: 1 };
        break;
      case 'price_desc':
        sortOption = { price: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const games = await Game.find(filter)
      .sort(sortOption)
      .populate('developer', '_id username');

    res.json(games);
  } catch (error) {
    console.error('Get games error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get single game by ID
// @route   GET /api/games/:id
// @access  Public
const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id)
      .populate('developer', '_id username avatarUrl');

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.json(game);
  } catch (error) {
    console.error('Get game error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Create new game
// @route   POST /api/games
// @access  Private
const createGame = async (req, res) => {
  try {
    const { title, description, price, genre, platform, coverImageUrl, gameFileUrl } = req.body;

    const game = await Game.create({
      title,
      description,
      price,
      genre,
      platform,
      coverImageUrl: coverImageUrl || 'https://placehold.co/600x400/333/FFF?text=Game',
      gameFileUrl,
      developer: req.userId
    });

    // Add game to user's listings
    await User.findByIdAndUpdate(req.userId, {
      $push: { listings: game._id }
    });

    const populatedGame = await Game.findById(game._id)
      .populate('developer', '_id username');

    res.status(201).json(populatedGame);
  } catch (error) {
    console.error('Create game error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Update game
// @route   PUT /api/games/:id
// @access  Private
const updateGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Check if user is the game developer
    if (game.developer.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this game' });
    }

    const { title, description, price, genre, platform, coverImageUrl, gameFileUrl } = req.body;

    // Update fields
    if (title) game.title = title;
    if (description) game.description = description;
    if (price !== undefined) game.price = price;
    if (genre) game.genre = genre;
    if (platform) game.platform = platform;
    if (coverImageUrl) game.coverImageUrl = coverImageUrl;
    if (gameFileUrl) game.gameFileUrl = gameFileUrl;

    const updatedGame = await game.save();
    const populatedGame = await Game.findById(updatedGame._id)
      .populate('developer', '_id username');

    res.json(populatedGame);
  } catch (error) {
    console.error('Update game error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Delete game
// @route   DELETE /api/games/:id
// @access  Private
const deleteGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Check if user is the game developer
    if (game.developer.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this game' });
    }

    await Game.findByIdAndDelete(req.params.id);

    // Remove game from user's listings
    await User.findByIdAndUpdate(req.userId, {
      $pull: { listings: req.params.id }
    });

    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    console.error('Delete game error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

module.exports = {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame
};
