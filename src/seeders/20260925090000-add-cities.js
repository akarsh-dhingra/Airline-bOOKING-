'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const cities = ['Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata'];
    const valueTuples = cities
      .map(city => `('${city}', '${now.toISOString()}', '${now.toISOString()}')`)
      .join(',\n');
    await queryInterface.sequelize.query(
      `INSERT INTO "Cities" ("name", "createdAt", "updatedAt")
       VALUES ${valueTuples}
       ON CONFLICT ("name") DO NOTHING;`
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', {
      name: ['Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata']
    });
  }
};