'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Books",
      [
        {
          userId: 1,
          name: "First book",
          price:100,
          description:
            "Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        { 
          userId: 2,
          name: "Second book",
          price:200,
          description:
            "Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],

      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Books", null, {})
};