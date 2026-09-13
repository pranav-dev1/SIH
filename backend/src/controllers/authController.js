const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const memoryStore = require('../config/memoryStore');

const register = (req, res) => {
  try {
    const { name, email, password, role, institution } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    const existingUser = memoryStore.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    const allowedRoles = ['trainee', 'trainer', 'admin'];
    const userRole = allowedRoles.includes(role) ? role : 'trainee';

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = memoryStore.createUser({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: userRole,
      institution: institution || 'General Participant'
    });

    const secret = process.env.JWT_SECRET || 'capacity_connect_super_secret_jwt_key_2026';
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, secret, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        institution: newUser.institution
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during registration', error: error.message });
  }
};

const login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = memoryStore.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Password mismatch.' });
    }

    const secret = process.env.JWT_SECRET || 'capacity_connect_super_secret_jwt_key_2026';
    const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '7d' });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        institution: user.institution
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during login', error: error.message });
  }
};

const getProfile = (req, res) => {
  try {
    const user = memoryStore.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        institution: user.institution,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching profile', error: error.message });
  }
};

const updateProfile = (req, res) => {
  try {
    const { name, institution } = req.body;
    const updated = memoryStore.updateUser(req.user.id, { name, institution });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updated._id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
        institution: updated.institution
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating profile', error: error.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};
