'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Reviews',
      'name',
      {
        allowNull: false,
        type: Sequelize.STRING,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Reviews', 'name');
  }
};
