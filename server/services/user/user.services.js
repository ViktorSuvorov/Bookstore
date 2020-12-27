const bcrypt = require('bcrypt');
const models = require('../../database/models');
const jwtGenerator = require('../../utils/auth.helpers');
const asyncHandler = require('express-async-handler');

const createNewUser = async ({ name, email, password }) => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const bcryptPassword = await bcrypt.hash(password, salt);
  const newUser = await models.User.create({
    name,
    email,
    password: bcryptPassword,
    isAdmin: false,
    image: '/images/user.png',
  });
  const token = jwtGenerator(newUser.id);
  return { token, newUser };
};

const getUserBodyData = (req) => {
  return req.body;
};

const getUser = asyncHandler(async ({ email }) => {
  return (user = await models.User.findOne({ where: { email } }));
});

const getUserById = asyncHandler(async ({ params: { id } }) => {
  return (user = await models.User.findOne({ where: { id } }));
});

const getAllUsers = asyncHandler(async () => {
  return (user = await models.User.findAll());
});

const checkPassword = asyncHandler(async (user, data) => {
  return (isValid = await bcrypt.compare(data.password, user.password));
});

const createToken = (user) => {
  return (token = jwtGenerator(user.id));
};

const checkProfile = asyncHandler(async ({ user }) => {
  return (user = await models.User.findOne({ where: { id: user } }));
});

const checkProfileAndUpdate = asyncHandler(async (req) => {
  const data = await models.User.findOne({ where: { id: req.user } });
  if (data) {
    data.name = req.body.name || data.name;
    data.email = req.body.email || data.email;
    data.image = req.body.image || data.image;
    if (req.body.password) {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const bcryptPassword = await bcrypt.hash(req.body.password, salt);
      data.password = bcryptPassword;
    }
    const updatedUser = await data.save();
    return updatedUser;
  }
});

const checkProfileAndUpdateByAdmin = asyncHandler(async (req) => {
  const data = await models.User.findOne({ where: { id: req.params.id } });
  if (data) {
    data.name = req.body.name || data.name;
    data.email = req.body.email || data.email;
    data.isAdmin = req.body.isAdmin;
    return await data.save();
  }
});

const deleteUser = asyncHandler(async ({ params: { id } }) => {
  const user = await models.User.findOne({ where: { id } });
  user.destroy();
});

const checkBook = asyncHandler(
  async (req) => await models.Book.findOne({ where: { id: req.body.bookId } })
);

const alredyInFavorite = asyncHandler(
  async (req) =>
    await models.User_Books.findOne({
      where: { userId: req.body.userId, bookId: req.body.bookId },
    })
);

const addToUserBooksTable = asyncHandler(
  async (req) =>
    await new models.User_Books({
      userId: req.body.userId,
      bookId: req.body.bookId,
    })
);

const getFavorite = asyncHandler(
  async (req) =>
    await models.User.findOne({
      where: { id: req.body.userId },
      attributes: { exclude: ['password'] },
      include: [{ model: models.Book }],
    })
);

const addToFavourite = async (req) =>
  await new models.User_Books({
    userId: req.body.userId,
    bookId: req.body.bookId,
  });

module.exports = {
  createNewUser,
  getUserBodyData,
  getUser,
  checkPassword,
  createToken,
  checkProfile,
  checkProfileAndUpdate,
  getAllUsers,
  deleteUser,
  getUserById,
  checkProfileAndUpdateByAdmin,
  checkBook,
  alredyInFavorite,
  addToUserBooksTable,
  getFavorite,
  addToFavourite,
};
