const { Router } = require('express');
const bookRouter = require('./book/book.routes');
const userRouter = require('./user/user.routes');
const uploadRouter = require('./uploads/upload.routes');
const router = Router();

router.use('/user',userRouter);
router.use('/books',bookRouter);
router.use('/upload',uploadRouter)


module.exports = router;
