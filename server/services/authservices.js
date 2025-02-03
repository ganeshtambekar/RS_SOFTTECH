// server/services/authService.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};