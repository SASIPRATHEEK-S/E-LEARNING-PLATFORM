const { findUserById, saveUser } = require('../services/userService');

exports.updateProfile = async (req, res) => {
  try {
    const { name, profile, instructorProfile } = req.body;
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) {
      user.name = name;
    }

    if (profile) {
      user.profile = {
        ...user.profile?.toObject?.(),
        ...user.profile,
        ...profile,
      };
    }

    if (instructorProfile && user.role === 'instructor') {
      user.instructorProfile = {
        ...user.instructorProfile?.toObject?.(),
        ...user.instructorProfile,
        ...instructorProfile,
      };
    }

    await saveUser(user);

    const sanitizedUser = user.toObject();
    delete sanitizedUser.password;
    delete sanitizedUser.otp;
    delete sanitizedUser.otpExpires;

    res.json(sanitizedUser);
  } catch (error) {
    console.error('updateProfile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};