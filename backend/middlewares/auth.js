const jwt = require('jsonwebtoken');
const config = require('../config/dbConfig');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  const tokenFromHeader = authHeader?.replace('Bearer ', '');
  const token = tokenFromHeader || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const userId = decoded?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    const user = await User.findById(userId).select('_id name email role verified');
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }
    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
    };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
