const Order = require('../models/Order');
const Game = require('../models/Game');
const User = require('../models/User');

// @desc    Purchase a game
// @route   POST /api/orders/purchase/:gameId
// @access  Private
const purchaseGame = async (req, res) => {
  try {
    const buyerId = req.userId;
    const gameId = req.params.gameId;

    // Find the game and populate developer
    const game = await Game.findById(gameId).populate('developer');
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Find the buyer
    const buyer = await User.findById(buyerId);
    if (!buyer) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if game is already in buyer's library
    if (buyer.library.includes(gameId)) {
      return res.status(400).json({ message: 'You already own this game' });
    }

    // Check if buyer is trying to buy their own game
    if (game.developer._id.toString() === buyerId) {
      return res.status(400).json({ message: 'Cannot purchase your own game' });
    }

    // Create order
    const order = await Order.create({
      buyer: buyerId,
      seller: game.developer._id,
      game: gameId,
      purchasePrice: game.price
    });

    // Add game to buyer's library
    await User.findByIdAndUpdate(buyerId, {
      $push: { library: gameId }
    });

    const populatedOrder = await Order.findById(order._id)
      .populate('buyer', 'username')
      .populate('seller', 'username')
      .populate('game', 'title coverImageUrl');

    res.status(201).json({
      message: 'Purchase successful',
      order: populatedOrder
    });
  } catch (error) {
    console.error('Purchase game error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

module.exports = {
  purchaseGame
};
