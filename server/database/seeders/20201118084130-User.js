'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'Viktor Suvorov',
        email: 'janedoe@example.com',
        password:12345,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alexander Suvorov',
        email: 'jondoe@example.com',
        password:12345,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};