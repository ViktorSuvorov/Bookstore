const bcrypt = require('bcrypt');
const models = require('../../database/models');
const jwtGenerator = require('../../utils/auth.helpers');

const createNewUser = async ( { name, email, password } ) => {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    const newUser = await models.User.create({
      name,
      email,
      password: bcryptPassword,
    });
    const token = jwtGenerator(newUser.id);
    return {token ,newUser};
};

const getUserBodyData = ( req ) => {
  return req.body;
};

const getUser = async ( { email } ) => {
    return user = await models.User.findOne({ where: { email } });
}

const checkPassword = async (user,data) => {
    return isValid = await bcrypt.compare(data.password,user.password);
}

const createToken = (user) => {
    return token = jwtGenerator(user.id);
}

const checkProfile = async ( { user } ) => {
  return user = await models.User.findOne({where: { id: user }});
}

module.exports = {
  createNewUser,
  getUserBodyData,
  getUser,
  checkPassword,
  createToken,
  checkProfile,
};
