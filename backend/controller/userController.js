const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, bio, location, website, socialLinks } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update profile fields
    user.profile = {
      ...user.profile,
      firstName,
      lastName,
      bio,
      location,
      website,
      socialLinks: {
        ...user.profile.socialLinks,
        ...socialLinks
      }
    };

    await user.save();
    res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
};

const updateAvatar = async (req, res) => {
  try {
    // Here you would typically handle file upload
    // For now, we'll just accept a URL
    const { avatarUrl } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profile.avatar = avatarUrl;
    await user.save();
    
    res.json({ message: 'Avatar updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while updating avatar' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updateAvatar
}; 