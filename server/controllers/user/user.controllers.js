const userService = require('../../services/user/user.services');

const registerNewUser = async (req, res) => {
  try {
    console.log('register',req.body);
    const data = await userService.getUserBodyData(req);
    const user = await userService.getUser(data);
    if (user) {
      res.status(401);
      throw new Error('User alredy exists');
    }
    const result = await userService.createNewUser(data);
    res.json({
      token: result.token,
      id: result.newUser.id,
      email: result.newUser.email,
      isAdmin: result.newUser.isAdmin,
      name: result.newUser.name,
    });
    console.log(token);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const data = await userService.getUserBodyData(req);
    const user = await userService.getUser(data);
    if (!user) {
      res.status(401).json('pwd or email incorrect');
    }
    const validPassword = await userService.checkPassword(user, data);
    if (!validPassword) {
      return res.status(401).json('pwd or email incorrect');
    }
    const token = userService.createToken(user);
    res.json({
      token,
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
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
    const user = await userService.checkProfile(req);
    res.json({
      name: user.name,
      email: user.email,
      id: user.id,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server error');
  }
};

module.exports = {
  registerNewUser,
  login,
  isVerify,
  profile,
};
