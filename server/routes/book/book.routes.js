const { Router } = require('express');
const {isAuthorized, isAdmin} = require('../../middleware/authorization');
const controllers = require('../../controllers');
const bookRouter = Router();

bookRouter.get('/',controllers.bookControllers.getAllBooks);
bookRouter.get('/test',controllers.bookControllers.testing);
bookRouter.post('/',isAuthorized,isAdmin,controllers.bookControllers.createBook);
bookRouter.get('/authors',controllers.bookControllers.getAllAuthors);
bookRouter.get('/:id',controllers.bookControllers.getCurrentBook);
bookRouter.post('/:id/reviews',controllers.bookControllers.createBookReview);
bookRouter.delete('/:id',isAuthorized,isAdmin,controllers.bookControllers.deleteBook)
bookRouter.put('/:id',isAuthorized,isAdmin,controllers.bookControllers.updateBook);

module.exports = bookRouter;