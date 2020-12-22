const asyncHandler = require('express-async-handler');
const models = require('../../database/models');
const Sequelize = require('sequelize');
const bookService = require('../../services/book/book.services');

const getAllBooks = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const booksFilters = bookService.getAllBooksQuery(req);
  const books = await bookService.getBooks(booksFilters, pageSize, page);
  const count = await bookService.getCountOfBooks(req);
  res.status(201).json({ books, page, pages: Math.ceil(count / pageSize) });
});

const getCurrentBook = asyncHandler(async (req, res) => {
  const bookId = bookService.getAllBooksParams(req);
  const book = await bookService.getBookById(bookId);
  if (book) {
    res.json(book);
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

const deleteBook = asyncHandler(async (req, res) => {
  const bookId = bookService.getAllBooksParams(req);
  const book = await bookService.getBookById(bookId);
  if (book) {
    await bookService.deleteBookById(book);
    res.json({ message: 'Book removed' });
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

const createBook = asyncHandler(async (req, res) => {
  const book = await bookService.createNewBook(req);
  res.status(201).json(book);
});

const updateBook = asyncHandler(async (req, res) => {
  const data = bookService.getDataFromReqBody(req);
  const bookId = bookService.getAllBooksParams(req);
  const book = await bookService.getBookById(bookId);
  if (book) {
    book.name = data.name;
    book.price = data.price;
    book.userId = data.userId;
    book.image = data.image;
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

const createBookReview = asyncHandler(async (req, res) => {
  const data = bookService.getDataFromReqBody(req);

  const bookId = bookService.getAllBooksParams(req);
  let book = await bookService.getBookForReview(bookId);
  if (book) {
    const alreadReviewed = book.reviews.find(
      (review) => review.userId === req.body.id
    );
    if (alreadReviewed) {
      res.status(400);
      throw new Error('Book alredy reviewed');
    }
    bookService.createNewReview(req);

    let rating = await bookService.getBookReviewTotal(bookId);

    if (rating > 0) {
      book.rating = 0;
      book.rating = rating;
    } else {
      book.rating = req.body.rating;
    }

    await book.save();
    res.status(201).json({ message: 'Review added' });
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
};
