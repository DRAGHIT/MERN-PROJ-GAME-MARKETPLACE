const { body, validationResult } = require('express-validator');

// Validation middleware to check results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Validation failed', 
      errors: errors.array() 
    });
  }
  next();
};

// Auth validation chains
const registerValidation = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  validate
];

const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email'),
  body('password')
    .notEmpty().withMessage('Password is required'),
  validate
];

// Game validation chains
const createGameValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Game title is required'),
  body('description')
    .trim()
    .notEmpty().withMessage('Game description is required'),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a number')
    .isFloat({ min: 0 }).withMessage('Price cannot be negative'),
  body('genre')
    .notEmpty().withMessage('Genre is required')
    .isIn(['Action', 'RPG', 'Strategy', 'Simulation', 'Puzzle', 'Other'])
    .withMessage('Invalid genre'),
  body('platform')
    .notEmpty().withMessage('Platform is required')
    .isIn(['PC', 'Mac', 'Linux', 'Web'])
    .withMessage('Invalid platform'),
  body('coverImageUrl')
    .optional()
    .isURL().withMessage('Cover image URL must be valid'),
  body('gameFileUrl')
    .notEmpty().withMessage('Game file URL is required')
    .isURL().withMessage('Game file URL must be valid'),
  validate
];

const updateGameValidation = [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Game title cannot be empty'),
  body('description')
    .optional()
    .trim()
    .notEmpty().withMessage('Game description cannot be empty'),
  body('price')
    .optional()
    .isNumeric().withMessage('Price must be a number')
    .isFloat({ min: 0 }).withMessage('Price cannot be negative'),
  body('genre')
    .optional()
    .isIn(['Action', 'RPG', 'Strategy', 'Simulation', 'Puzzle', 'Other'])
    .withMessage('Invalid genre'),
  body('platform')
    .optional()
    .isIn(['PC', 'Mac', 'Linux', 'Web'])
    .withMessage('Invalid platform'),
  body('coverImageUrl')
    .optional()
    .isURL().withMessage('Cover image URL must be valid'),
  body('gameFileUrl')
    .optional()
    .isURL().withMessage('Game file URL must be valid'),
  validate
];

// User profile update validation
const updateProfileValidation = [
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('bio')
    .optional()
    .isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters'),
  body('avatarUrl')
    .optional()
    .isURL().withMessage('Avatar URL must be valid'),
  validate
];

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  createGameValidation,
  updateGameValidation,
  updateProfileValidation
};
