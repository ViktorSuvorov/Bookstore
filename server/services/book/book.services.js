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

const getBooks = async (filters, pageSize, page) => {

  const authorsId = filters.authorId.split(',').map((item) => Number(item));
  const genresId = filters.genreId.split(',').map((item) => Number(item));
  const skipValue = pageSize * (page - 1);

  let sortField;
  let sortOrder;

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
  if (!filters.ratingType || !filters.priceType) {
    sortField = 'price'
    sortOrder = 'asc'
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

const getBookById = asyncHandler(async (id) => {
  return await models.Book.findOne({
    where: { id },
    include: [
      {
        model: models.Review,
        as: 'reviews',
      },
      {
        model: models.Genre,
        as: 'genre',
      },
      {
        model: models.Author,
        as: 'author',
      },
    ],
  });
});

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
  const name = Sequelize.where(
    Sequelize.fn('Lower', Sequelize.col('Book.name')),
    'LIKE',
    '%' + req.query.keyword.toLowerCase() + '%'
  );
  const authorsId = req.query.authorId.split(',').map((item) => Number(item));
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
    ],
  });
  console.log('COUNT FROM GET COUNT', count);
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
