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

const getBooks = ({ name, genre, author, keyword }, pageSize, page) => {
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

  if (genre) {
    options.where.genre = genre;
  }

  return models.Book.findAll(options);
};

const getBookById = asyncHandler(async (id) =>
 await models.Book.findOne({
    where: { id },
    include: [
      {
        model: models.Review,
        as: 'reviews',
      },
    ],
  }));

const deleteBookById = (book) => book.destroy();

const createNewBook = (req) => {
  return models.Book.create({
    name: 'Sample Name',
    price: 0,
    userId: req.user,
    image: '/images/sample.jpeg',
    author: 'Sample author',
    genre: 'Sample genre',
    description: 'Put descriprion here',
    rating: 0,
  });
};

const createNewReview = asyncHandler(async (req) => {
  let rating = Number(req.body.rating);
  await models.Review.create({
    name: req.body.name,
    rating: rating,
    comment: req.body.comment,
    bookId: req.params.id,
    userId: req.body.id,
  });
});

const getCountOfBooks = asyncHandler(async (req) => {
  if (req.query.keyword) {
    return await models.Book.count({ where: { name: req.query.keyword } });
  } else {
    return await models.Book.count();
  }
});

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

const getBookForReview = asyncHandler(async (id) => {
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
});

const getBookReviewTotal = asyncHandler(async (id) => {
  const total = await models.Review.sum('Review.rating', {
    where: { bookId: id },
  });
  const amount = await models.Review.findAndCountAll({
    where: { bookId: id },
  });
  const result = total / (amount.count - 1 / 3);
  return result;
});

module.exports = {
  getAllBooksQuery,
  getAllBooksParams,
  getBookById,
  getBooks,
  deleteBookById,
  createNewBook,
  getDataFromReqBody,
  getCountOfBooks,
  createNewReview,
  getBookForReview,
  getBookReviewTotal,
};
