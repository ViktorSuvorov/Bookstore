const { Router } = require('express');
const { isAuthorized, isAdmin } = require('../../middleware/authorization');
const controllers = require('../../controllers');
const bookRouter = Router();

bookRouter.get('/authors', controllers.bookControllers.getAllAuthors);
bookRouter.get('/genres', controllers.bookControllers.getAllGenres);

bookRouter.get('/', controllers.bookControllers.getAllBooks);
bookRouter.get(
  '/admin/booklist',
  isAuthorized,
  isAdmin,
  controllers.bookControllers.getBookListAdmin
);

bookRouter.get('/:id', controllers.bookControllers.getCurrentBook);
bookRouter.post(
  '/',
  isAuthorized,
  isAdmin,
  controllers.bookControllers.createBook
);
bookRouter.delete(
  '/:id',
  isAuthorized,
  isAdmin,
  controllers.bookControllers.deleteBook
);
bookRouter.put(
  '/:id',
  isAuthorized,
  isAdmin,
  controllers.bookControllers.updateBook
);

bookRouter.post('/:id/reviews', controllers.bookControllers.createBookReview);
bookRouter.put('/:id/reviews', controllers.bookControllers.updateBookReview);
bookRouter.delete('/:id/reviews', controllers.bookControllers.deleteBookReview);

module.exports = bookRouter;
