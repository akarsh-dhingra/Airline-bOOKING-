'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Seats', null, {});

    const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
    const rows = [1, 2, 3, 4, 5, 6];

    const seats = [];
    for (const row of rows) {
      for (const column of columns) {
        seats.push({
          airplaneId: 17,
          row: row,
          column: column,
          type: row === 1 ? 'business' : 'economy',
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    await queryInterface.bulkInsert('Seats', seats, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Seats', { airplaneId: 17 });
  }
};
