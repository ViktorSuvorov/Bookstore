const asyncHandler = require('express-async-handler');
const userService = require('../../services/user/user.services');

const registerNewUser = asyncHandler(async (req, res) => {
  const data = await userService.getUserBodyData(req);
  const userAlredyExist = await userService.getUser(data);
  if (userAlredyExist) {
    res.status(401);
    throw new Error('User alredy exists');
  }
  const user = await userService.createNewUser(data);

  if (user) {
    res.status(201).json({
      token: user.token,
      id: user.newUser.id,
      email: user.newUser.email,
      isAdmin: user.newUser.isAdmin,
      name: user.newUser.name,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const login = asyncHandler(async (req, res) => {
  const data = await userService.getUserBodyData(req);
  const user = await userService.getUser(data);
  const token = userService.createToken(user);
  if (user && (await userService.checkPassword(user, data))) {
    res.json({
      token,
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Wrong email or password');
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await userService.checkProfile(req);
  if (user) {
    res.json({
      name: user.name,
      email: user.email,
      id: user.id,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await userService.checkProfileAndUpdate(req);
  if (user) {
    res.json({
      name: user.name,
      email: user.email,
      id: user.id,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(500);
    throw new Error('Internal server error');
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req);
  if (user) {
   const result = await userService.deleteUser(req);
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found ');
  }
});

// !!!
const isVerify = async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  registerNewUser,
  login,
  getUserProfile,
  isVerify,
  updateUserProfile,
  getUsers,
  deleteUser,
};
