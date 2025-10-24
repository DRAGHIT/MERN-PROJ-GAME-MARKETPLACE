const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Game title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Game description is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    enum: {
      values: ['Action', 'RPG', 'Strategy', 'Simulation', 'Puzzle', 'Other'],
      message: '{VALUE} is not a valid genre'
    }
  },
  platform: {
    type: String,
    required: [true, 'Platform is required'],
    enum: {
      values: ['PC', 'Mac', 'Linux', 'Web'],
      message: '{VALUE} is not a valid platform'
    }
  },
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Developer is required']
  },
  coverImageUrl: {
    type: String,
    required: true,
    default: 'https://placehold.co/600x400/333/FFF?text=Game'
  },
  gameFileUrl: {
    type: String,
    required: [true, 'Game file URL is required']
  },
  releaseDate: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
