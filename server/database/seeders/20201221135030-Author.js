'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Authors',
    [
      {
        name: 'Пушкин А.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Дефо Д.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Гоголь Н.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Киплинг Р.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Лесков Н.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Тургенев И.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Достоевский Ф.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Толстой Л.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Чехов А.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Алексин А.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
