'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Genres',
    [
      {
        name: 'Научная фантастика',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Приключения',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Наука',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Детектив',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Фантастика',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Роман',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Повесть',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Рассказ.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Притча',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Психология',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
