const models = require('../database/models');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../routes/authorization/helpers');

const createUser = async (req, res) => {
  try {
    const user = await models.User.create(req.body);
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const registerNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await models.User.findAll();
    const allUsersEmails = user.map((user) => user.email);
    if (allUsersEmails.includes(email)) {
      return res.status(401).send('User alredy exist');
    }
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    const newUser = await models.User.create({
      name,
      email,
      password: bcryptPassword,
    });
    const token = jwtGenerator(newUser.id);
    res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { password } = req.body;
    const currentEmail = await models.User.findOne({
      where: { email: req.body.email },
    });
    if (!currentEmail) {
      return res.status(401).json('pwd or email incorrect');
    }
    const currentUser = await models.User.findOne({
      where: { email: req.body.email },
    });
    const validPassword = await bcrypt.compare(password, currentUser.password);
    if (!validPassword) {
      return res.status(401).json('pwd or email incorrect');
    }
    const token = jwtGenerator(currentUser.id);
    res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const isVerify = async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const profile = async (req, res) => {
  try {
    const user = await models.User.findOne({ where: { id: req.user } });
    res.json({ name:user.name,email:user.email});
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server error');
  }
};

const getAllBooks = async (req,res) => {
  try {
    const books = await models.Book.findAll();
    console.log(books)
    const answer = res.json(books)
    console.log('answer',answer)
  } catch (error) {
    console.error(console.message)
  }
}

module.exports = {
  createUser,
  registerNewUser,
  login,
  isVerify,
  profile,
  getAllBooks,
};
