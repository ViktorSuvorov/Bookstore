'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.hasMany(models.Review, {
        foreignKey: 'bookId',
        as: 'reviews',
        onDelete: 'CASCADE',
      });

      Book.belongsToMany(models.User, {
        through: { model: models.User_Books, unique: false },
        foreignKey: 'bookId',
        onDelete: 'CASCADE',
      });

      Book.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'test',
        onDelete: 'CASCADE',
      });
    }
  }
  Book.init(
    {
      description: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      author: DataTypes.STRING,
      genre: DataTypes.STRING,
      rating: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'Book',
    }
  );
  return Book;
};
