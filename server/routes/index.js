const { Router } = require('express');
const bookRouter = require('./book/book.routes');
const userRouter = require('./user/user.routes');
const router = Router();

router.use('/user',userRouter);
router.use('/books',bookRouter);


module.exports = router;
