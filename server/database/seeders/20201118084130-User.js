'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'Tony Stark',
        email: 'Stark@оjarvis.com',
        password:123456,
        isAdmin:true,
        image:'https://cdn.igromania.ru/mnt/news/7/6/b/a/7/6/86257/6122e9f65da7ef05_1920xH.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chack  Norris',
        email: 'YouCallItAHit@example.com',
        image:'https://cutt.ly/eh8zi3O',
        isAdmin:false,
        password:123456,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};