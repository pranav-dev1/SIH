const jwt = require('jsonwebtoken');
const memoryStore = require('../config/memoryStore');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authorization token missing or invalid format' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'capacity_connect_super_secret_jwt_key_2026';
    const decoded = jwt.verify(token, secret);

    const user = memoryStore.findUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User associated with token no longer exists' });
    }

    req.user = {
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      institution: user.institution
    };

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token', error: error.message });
  }
};

module.exports = authMiddleware;
