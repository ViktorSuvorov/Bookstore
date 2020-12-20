'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'author'
      });
      Review.belongsTo(models.Book, {
        foreignKey: 'bookId',
        as: 'book'
      });
    }
  };
  Review.init({
    name:DataTypes.STRING,
    bookId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};