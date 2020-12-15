const models = require('../../database/models');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const getAllBooksQuery = (req) => {
  return req.query;
};

const getAllBooksParams = (req) => {
  return req.params;
};

const getBooks = ({ name, genre, author, search }) => {
  let options = { where: {} };

  if (search) {
    const name = Sequelize.where(
      Sequelize.fn('Lower', Sequelize.col('name')),
      'LIKE',
      '%' + search.toLowerCase() + '%'
    );
    const description = Sequelize.where(
      Sequelize.fn('LOWER', Sequelize.col('description')),
      'LIKE',
      '%' + search.toLowerCase + '%'
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
  return models.Book.findAll(options);
};

const getBookById = ({id}) => models.Book.findOne({ where: { id: id } });

module.exports = {
  getAllBooksQuery,
  getAllBooksParams,
  getBookById,
  getBooks,
};
