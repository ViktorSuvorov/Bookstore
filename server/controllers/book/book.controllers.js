const asyncHandler = require('express-async-handler');
const models = require('../../database/models');
const Sequelize = require('sequelize');
const bookService = require('../../services/book/book.services');

const getAllBooks = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  console.log('page',page);
 

  const count = await bookService.getCountOfBooks();  
  const j = Math.ceil(count / pageSize);
  console.log('pages',j);
  const booksFilters = bookService.getAllBooksQuery(req);
  const books = await bookService.getBooks(booksFilters,pageSize,page);
  res.status(201).json( {books, page, pages:Math.ceil(count / pageSize) });
});

const getCurrentBook = asyncHandler(async (req, res) => {
  const bookId =  bookService.getAllBooksParams(req);
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
    const authors = await models.Book.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('author')), 'author'],
      ],
    });
    res.json(authors);
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
    book.name = data.name
    book.price = data.price
    book.userId = data.userId
    book.image = data.image
    book.author = data.author
    book.genre = data.genre
    book.description = data.description
    book.rating = data.rating

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

module.exports = { getAllBooks, getCurrentBook, getAllAuthors, deleteBook,createBook, updateBook };
