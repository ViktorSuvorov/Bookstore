const models = require('../../database/models');
const Sequelize = require('sequelize');
const bookService = require('../../services/book/book.services');


const getAllBooks = async (req, res) => {
  const booksFilters = await bookService.getAllBooksQuery(req);
  const books = await bookService.getBooks(booksFilters);
  res.json(books);
};

const getCurrentBook = async (req, res) => {
  try {
    const bookId = await bookService.getAllBooksParams(req);
    const book = await bookService.getBookById(bookId);
    res.json(book);
  } catch (error) {
    console.error(console.message);
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const authors = await models.Book.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('author')), 'author'],
      ],
    });
    const answer = res.json(authors);
  } catch (error) {
    console.error(console.message);
  }
};

module.exports = { getAllBooks, getCurrentBook, getAllAuthors };
