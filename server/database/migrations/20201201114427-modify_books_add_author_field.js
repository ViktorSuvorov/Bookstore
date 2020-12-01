'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Books', 'author',
      {
        allowNull: true,
        type: Sequelize.STRING
      },
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Books', 'author');
  }
};