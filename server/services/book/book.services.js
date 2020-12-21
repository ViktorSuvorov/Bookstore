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
  console.log('authorID', filters.authorId)
  const skipValue = pageSize * (page - 1);
  let options = { where: {}, limit: pageSize, offset: skipValue, include: [
    {
      model: models.Genre,
      as: 'genre',
      where:{
        id:[1,2,3,4,5,6,7,8]
      }
    },
    {
      model: models.Author,
      as: 'author',
      where:{
        id:[7,8,9,1,2,3]
      }
    }
  ] };
  if (filters.keyword) {
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

  const l = await models.Book.findAll(options);
  console.log(l.length);
  return l;
};

const getBookById = asyncHandler(async (id) =>
 await models.Book.findOne({
    where: { id },
    include: [
      {
        model: models.Review,
        as: 'reviews',
      },
      {
        model: models.Genre,
        as: 'genre'
      },
      {
        model: models.Author,
        as: 'author'
      }
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
  if (req.query.keyword || req.query.author) {
    return await models.Book.count({where:{name:req.query.keyword,
    author:req.query.author}});
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
