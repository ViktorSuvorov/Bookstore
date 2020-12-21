'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'Jhon Smith',
        email: 'Smith@example.com',
        password:12345,
        isAdmin:true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Do',
        email: 'Do@example.com',
        isAdmin:false,
        password:12345,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};