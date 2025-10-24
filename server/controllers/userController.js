const User = require('../models/User');

// @desc    Get public user profile
// @route   GET /api/users/profile/:userId
// @access  Public
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-password -email')
      .populate('listings', '_id title coverImageUrl price genre platform')
      .populate('library', '_id title coverImageUrl');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      username: user.username,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      listings: user.listings,
      library: user.library
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/me
// @access  Private
const updateMyProfile = async (req, res) => {
  try {
    const { username, bio, avatarUrl } = req.body;

    const updateFields = {};
    if (username) updateFields.username = username;
    if (bio !== undefined) updateFields.bio = bio;
    if (avatarUrl) updateFields.avatarUrl = avatarUrl;

    // Check if username is already taken by another user
    if (username) {
      const existingUser = await User.findOne({ 
        username, 
        _id: { $ne: req.userId } 
      });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

module.exports = {
  getUserProfile,
  updateMyProfile
};
