const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    let token = req.header('Authorization');
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    if (!token) {
      return res.status(403).json('Not Authorize');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(403).json('Not Authorize');
  }
};
