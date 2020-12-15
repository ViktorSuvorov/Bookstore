const { Router } = require('express');
const controllers = require('../../controllers');
const authorization = require('../../middleware/authorization');
const validInfo = require('../../middleware/validinfo');
const userRouter = Router();

userRouter.post('/register',validInfo,controllers.userControllers.registerNewUser);
userRouter.post('/login',validInfo,controllers.userControllers.login)
userRouter.get('/is-verify',authorization,controllers.userControllers.isVerify)
userRouter.get('/profile',authorization,controllers.userControllers.profile)

module.exports = userRouter;