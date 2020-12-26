const asyncHandler = require('express-async-handler');
const models = require('../../database/models');
const bookService = require('../../services/book/book.services');

const getAllBooks = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const booksFilters = bookService.getDataFromBQuery(req);
  let page = Number(req.query.pageNumber) || 1;

  const books = await bookService.getBooks(booksFilters, pageSize, page);

  const count = await bookService.getCountOfBooks(req);
  const pages = Math.ceil(count / pageSize);

  res.status(201).json({ books, page, pages: pages });
});

const getCurrentBook = asyncHandler(async (req, res) => {
  const book = await bookService.getBookById(req);
  if (book) {
    res.json(book);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

const createBook = asyncHandler(async (req, res) => {
  const book = await bookService.createNewBook(req);
  res.status(201).json(book);
});

const deleteBook = asyncHandler(async (req, res) => {
  const book = await bookService.getBookById(req);
  if (book) {
    await bookService.deleteBookById(book);
    res.json({ message: 'Book removed' });
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

const updateBook = asyncHandler(async (req, res) => {
  const data = bookService.getDataFromReqBody(req);
  const book = await bookService.getBookById(req);
  if (book) {
    const addImage = await bookService.addImage(req);
    book.name = data.name;
    book.price = data.price;
    book.userId = data.userId;
    book.image = addImage;
    book.author = data.author;
    book.genre = data.genre;
    book.description = data.description;
    book.rating = data.rating;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

const getAllAuthors = asyncHandler(async (req, res) => {
  try {
    const authors = await models.Author.findAll({});
    res.json(authors);
  } catch (error) {
    console.error(console.message);
  }
});

const getAllGenres = asyncHandler(async (req, res) => {
  try {
    const genres = await models.Genre.findAll({});
    res.json(genres);
  } catch (error) {
    console.error(console.message);
  }
});

const createBookReview = asyncHandler(async (req, res) => {
  
  let book = await bookService.getBookForReview(req);
  if (book) {
    const alreadReviewed = book.reviews.find(
      (review) => review.userId === req.body.id
    );
    if (alreadReviewed) {
      res.status(400);
      throw new Error('Book alredy reviewed');
    }
   await  bookService.createNewReview(req);
   await bookService.getBookReviewTotal(req);

    await book.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

const updateBookReview = asyncHandler(async (req, res) => {
  const data = bookService.getDataFromReqBody(req);
  const book = await bookService.getBookById(req);
  if (book) {
    const review = await bookService.getReviewById(req);
    review.name = data.name;
    review.rating = data.rating;
    review.comment = data.comment;
    review.userId = data.userId;
    // review.id = data.id;

    
    // const addImage = await bookService.addImage(req);
    // book.name = data.name;
    // book.price = data.price;
    // book.userId = data.userId;
    // book.image = addImage;
    // book.author = data.author;
    // book.genre = data.genre;
    // book.description = data.description;
    // book.rating = data.rating;

    const updatedReview = await review.save();

    await bookService.getBookReviewTotal(req);

   
    console.log(updatedReview);
    const t = await book.update({updatedReview}, { where: { id:req.params.id }});
    res.json(updatedReview);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

module.exports = {
  getAllBooks,
  getCurrentBook,
  getAllAuthors,
  deleteBook,
  createBook,
  updateBook,
  createBookReview,
  getAllGenres,
  updateBookReview,
};
