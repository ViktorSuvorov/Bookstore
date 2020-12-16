const jwt = require('jsonwebtoken');
require('dotenv').config();
const asyncHandler = require('express-async-handler');
const userService = require('../services/user/user.services');

const isAuthorized = asyncHandler(async (req, res, next) => {
  try {
    let token = req.header('Authorization');
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    if (!token) {
      res.status(403);
      throw new Error('Not Authorize');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(403);
    throw new Error('Not Authorize');
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const user = await userService.checkProfile(req);
  if (user && user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an Admin');
  }
});

module.exports = {
  isAuthorized,
  isAdmin,
};
