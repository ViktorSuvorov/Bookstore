const { Router } = require('express');
const controllers = require('../controllers');
const authorization = require('../middleware/authorization');
const router = Router();
const validInfo = require('../middleware/validinfo');

router.get('/', (req, res) => res.send('Welcome'));
// create
router.post('/users',controllers.createUser);

// register and login 
router.post('/register',validInfo,controllers.registerNewUser);
router.post('/login',validInfo,controllers.login)
router.get('/is-verify',authorization,controllers.isVerify)
router.get('/profile',authorization,controllers.profile)

// books
router.get('/books',controllers.getAllBooks);
router.get('/books/:id',controllers.getCurrentBook);

// all 
// router.get('/',controllers.findAll);
// // one
// router.get('/',controllers.findOne);
// // modification
// router.post('/:id',controllers.update);
// // delete
// router.delete(':/',controllers.delete);

// router.post('/login',controllers.authorization);

module.exports = router;
