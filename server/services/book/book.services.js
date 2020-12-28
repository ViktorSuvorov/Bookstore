const models = require('../../database/models');
const Sequelize = require('sequelize');
const asyncHandler = require('express-async-handler');
const Op = Sequelize.Op;

const getDataFromBQuery = (req) => {
  return req.query;
};

const getBooks = async (filters, pageSize, page) => {
  const genresIdFromDb = [
    ...(await models.Genre.findAll({ attributes: ['id'], raw: true })),
  ].map((item) => item.id);
  const authorsIdFromDb = [
    ...(await models.Author.findAll({ attributes: ['id'], raw: true })),
  ].map((item) => item.id);
  const skipValue = pageSize * (page - 1);

  let authorsId = filters.authorId.split(',').map((item) => Number(item));
  let genresId = filters.genreId.split(',').map((item) => Number(item));
  let sortField;
  let sortOrder;

  if (genresId[0] === 0) {
    genresId = [...genresIdFromDb];
  }
  if (authorsId[0] === 0) {
    authorsId = [...authorsIdFromDb];
  }
  if (filters.priceType === 'price up') {
    sortField = 'price';
    sortOrder = 'asc';
  }
  if (filters.priceType === 'price down') {
    sortField = 'price';
    sortOrder = 'desc';
  }
  if (filters.ratingType === 'rating up') {
    sortField = 'rating';
    sortOrder = 'asc';
  }
  if (filters.ratingType === 'rating down') {
    sortField = 'rating';
    sortOrder = 'desc';
  }

  let options = {
    where: {},
    limit: pageSize,
    offset: skipValue,
    order: [[sortField, sortOrder]],
    include: [
      {
        model: models.Genre,
        as: 'genre',
        where: {
          id: {
            [Op.or]: genresId,
          },
        },
      },
      {
        model: models.Image,
        as: 'image',
      },
      {
        model: models.Author,
        as: 'author',
        where: {
          id: {
            [Op.or]: authorsId,
          },
        },
      },
    ],
  };

  if (filters.keyword) {
    const name = Sequelize.where(
      Sequelize.fn('Lower', Sequelize.col('Book.name')),
      'LIKE',
      '%' + filters.keyword.toLowerCase() + '%'
    );
    options.where = {
      name,
    };
  }

  return models.Book.findAll(options);
};

const getBookById = asyncHandler(async ({ params: { id } }) => {
  return await models.Book.findOne({
    where: { id },
    include: [
      {
        model: models.Review,
        as: 'reviews',
        attributes: [
          'comment',
          'rating',
          'createdAt',
          'name',
          'id',
          'userId',
          'bookId',
        ],
      },
      {
        model: models.Genre,
        as: 'genre',
        attributes: ['name', 'id'],
      },
      {
        model: models.Author,
        as: 'author',
        attributes: ['name', 'id'],
      },
      {
        model: models.Image,
        as: 'image',
        attributes: ['url'],
      },
    ],
  });
});

const deleteBookById = (book) => book.destroy();

const createNewBook = (req) => {
  return models.Book.create({
    name: 'TEST Name',
    price: 200,
    userId: req.user,
    authorId: 2,
    genreId: 1,
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

const addImage = asyncHandler(async (req) => {
  await models.Image.create({
    bookId: req.params.id,
    url: req.body.image,
  });
});

const getCountOfBooks = asyncHandler(async (req) => {
  const name = Sequelize.where(
    Sequelize.fn('Lower', Sequelize.col('Book.name')),
    'LIKE',
    '%' + req.query.keyword.toLowerCase() + '%'
  );
  const authorsId = req.query.authorId.split(',').map((item) => Number(item));
  const genresId = req.query.genreId.split(',').map((item) => Number(item));
  const count = await models.Book.count({
    where: {
      name,
    },
    include: [
      {
        model: models.Author,
        as: 'author',
        where: {
          id: { [Op.or]: authorsId },
        },
      },
      {
        model: models.Genre,
        as: 'genre',
        where: {
          id: { [Op.or]: genresId },
        },
      },
    ],
  });
  return count;
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

const getBookForReview = asyncHandler(async ({ params: { id } }) => {
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

const getBookForUpdateImage = asyncHandler(async (id) => {
  const book = await models.Book.findOne({
    where: { id },
    include: [
      {
        model: models.Image,
        as: 'image',
      },
    ],
  });
  if (book) {
    return book;
  } else {
    throw new Error('Book not found');
  }
});

const getBookReviewTotal = asyncHandler(async ({ params: { id } }) => {
  const bookReviews = await models.Review.findAll({
    where: { bookId: id },
  });
  const sum = bookReviews.reduce((sum, review) => sum + review.rating, 0);
  const rating = sum / bookReviews.length;
  await models.Book.update({ rating }, { where: { id } });
});

const getReviewById = asyncHandler(async (req) => {
  return await models.Review.findOne({
    where: { id: req.body.reviewId },
  });
});

const deleteReviewById = (review) => review.destroy();

module.exports = {
  getDataFromBQuery,
  getBookById,
  getBooks,
  deleteBookById,
  createNewBook,
  getDataFromReqBody,
  getCountOfBooks,
  createNewReview,
  getBookForReview,
  getBookReviewTotal,
  getBookForUpdateImage,
  addImage,
  getReviewById,
  deleteReviewById,
};