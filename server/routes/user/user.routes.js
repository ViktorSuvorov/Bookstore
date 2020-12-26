const { Router } = require('express');
const controllers = require('../../controllers');
const {isAuthorized, isAdmin} = require('../../middleware/authorization');
const validInfo = require('../../middleware/validinfo');
const userRouter = Router();

userRouter.post('/register', validInfo,controllers.userControllers.registerNewUser);
userRouter.post('/login', validInfo,controllers.userControllers.login);
userRouter.get('/profile', isAuthorized,controllers.userControllers.getUserProfile);
userRouter.put('/profile', isAuthorized,controllers.userControllers.updateUserProfile );
userRouter.get('/', isAuthorized,isAdmin,controllers.userControllers.getUsers);
userRouter.delete('/:id',isAuthorized,isAdmin,controllers.userControllers.deleteUser);
userRouter.put('/:id',isAuthorized,isAdmin,controllers.userControllers.updateUserProfileByAdmin);
userRouter.get('/:id',isAuthorized,isAdmin,controllers.userControllers.updateUserProfileByAdmin);
userRouter.post("/favorite",isAuthorized,controllers.userControllers.addToFavourite);
module.exports = userRouter;