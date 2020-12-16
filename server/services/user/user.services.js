const bcrypt = require('bcrypt');
const models = require('../../database/models');
const jwtGenerator = require('../../utils/auth.helpers');

const createNewUser = async ({ name, email, password }) => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const bcryptPassword = await bcrypt.hash(password, salt);
  const newUser = await models.User.create({
    name,
    email,
    password: bcryptPassword,
  });
  const token = jwtGenerator(newUser.id);
  return { token, newUser };
};

const getUserBodyData = (req) => {
  return req.body;
};

const getUser = async ({ email }) => {
  return (user = await models.User.findOne({ where: { email } }));
};

const getUserById = async ({ params:{id} }) => {
  return (user = await models.User.findOne({ where: { id } }));
};

const getAllUsers = async () => {
  return (user = await models.User.findAll());
};

const checkPassword = async (user, data) => {
  return (isValid = await bcrypt.compare(data.password, user.password));
};

const createToken = (user) => {
  return (token = jwtGenerator(user.id));
};

const checkProfile = async ({ user }) => {
  return (user = await models.User.findOne({ where: { id: user } }));
};

const checkProfileAndUpdate = async (req) => {
  const data = await models.User.findOne({ where: { id: req.user } });
  if (data) {
    data.name = req.body.name || data.name;
    data.email = req.body.email || data.email;
    if (req.body.password) {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const bcryptPassword = await bcrypt.hash(req.body.password, salt);
      data.password = bcryptPassword;
    }
    const updatedUser = await data.save();
    return updatedUser;
  }
};

const deleteUser = async ({params:{id}}) => {
  const user = await models.User.findOne({ where: { id } });
  user.destroy();
};

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
};
