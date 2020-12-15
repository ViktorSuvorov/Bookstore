const { Router } = require('express');
const controllers = require('../../controllers');
const bookRouter = Router();

bookRouter.get('/',controllers.bookControllers.getAllBooks);
bookRouter.get('/authors',controllers.bookControllers.getAllAuthors);
bookRouter.get('/:id',controllers.bookControllers.getCurrentBook);

module.exports = bookRouter;