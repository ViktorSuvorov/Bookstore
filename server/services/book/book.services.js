const models = require('../../database/models');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const getAllBooksQuery = (req) => {
  return req.query;
};

const getAllBooksParams = (req) => {
  return req.params.id;
};

const getBooks = ({ name, genre, author, search, keyword }, pageSize, page) => {
  // keyword = keyword
  //   ? {
  //       name: {
  //         $regex: keyword,
  //         $options: 'i',
  //       },
  //     }
  //   : {};

    console.log(keyword);

  const skipValue = pageSize * (page - 1);
  let options = { where: {}, limit: pageSize, offset: skipValue, ...keyword};
  if (keyword) {
    console.log('im work');
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

const getBookById = (id) => models.Book.findOne({ where: { id } });

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

module.exports = {
  getAllBooksQuery,
  getAllBooksParams,
  getBookById,
  getBooks,
  deleteBookById,
  createNewBook,
  getDataFromReqBody,
  getCountOfBooks,
};
