'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Books',
      'authorId', 
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    ),
    queryInterface.addColumn(
      'Books',
      'genreId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    ),
    queryInterface.removeColumn(
      'Books',
      'author'
    ),
    queryInterface.removeColumn(
      'Books',
      'genre'
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
