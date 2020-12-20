'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Book.init({
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    name: DataTypes.STRING,
    image:DataTypes.STRING,
    author:DataTypes.STRING,
    genre:DataTypes.STRING,
    rating:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};
