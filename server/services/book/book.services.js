const models = require('../../database/models');
const Sequelize = require('sequelize');
const asyncHandler = require('express-async-handler');
const Op = Sequelize.Op;

const getAllBooksQuery = (req) => {
  return req.query;
};

const getAllBooksParams = (req) => {
  return req.params.id;
};

const getBooks = ({ name, genre, author, search, keyword }, pageSize, page) => {
  const skipValue = pageSize * (page - 1);
  let options = { where: {}, limit: pageSize, offset: skipValue };
  if (keyword) {
    const name = Sequelize.where(
      Sequelize.fn('Lower', Sequelize.col('name')),
      'LIKE',
      '%' + keyword.toLowerCase() + '%'
    );
    const description = Sequelize.where(
      Sequelize.fn('LOWER', Sequelize.col('description')),
      'LIKE',
      '%' + keyword.toLowerCase() + '%'
    );
    options.where = {
      [Op.or]: [name, description],
    };
  }

  if (author) {
    options.where.author = author;
  }

  if (name) {
    options.where.name = name;
  }

  if (genre) {
    options.where.genre = genre;
  }
  console.log(options);
  return models.Book.findAll(options);
};

const getBookById = (id) =>
  models.Book.findOne({
    where: { id },
    include: [
      {
        model: models.Review,
        as: 'reviews',
      },
    ],
  });

const deleteBookById = (book) => book.destroy();

const createNewBook = (req) =>
  models.Book.create({
    name: 'Sample Name',
    price: 0,
    userId: req.user.id,
    image: '/images/sample.jpeg',
    author: 'Sample author',
    genre: 'Sample genre',
    description: 'Put descriprion here',
    rating: 0,
  });

const createNewReview = (req) => {
  const rating = Number(req.body.rating);
  models.Review.create({
    name: req.body.name,
    rating: rating,
    comment: req.body.comment,
    bookId: req.params.id,
    userId: req.body.id,
  });
};

const getCountOfBooks = async () => {
  return await models.Book.count();
};

const getDataFromReqBody = (req) =>
  ({
    name,
    price,
    userId,
    image,
    author,
    genre,
    description,
    rating,
  } = req.body);

const test = asyncHandler(async (req, res) => {
  const books = await models.Book.findAll({
    include: [
      {
        model: models.Review,
        as: 'reviews',
      },
      {
        model: models.User,
        as: 'test',
      },
    ],
  });
  if (books) {
    return res.json({ books });
  } else {
    return res.status(500);
  }
});

const getBookForReview = async (id) => {
  const book = await models.Book.findOne({
    where: { id },
    include: [
      {
        model: models.Review,
        as: 'reviews',
      },
    ],
  });
  if (book) {
    return book;
  } else {
    throw new Error('Book not found');
  }
};

module.exports = {
  getAllBooksQuery,
  getAllBooksParams,
  getBookById,
  getBooks,
  deleteBookById,
  createNewBook,
  getDataFromReqBody,
  getCountOfBooks,
  test,
  createNewReview,
  getBookForReview,
};
