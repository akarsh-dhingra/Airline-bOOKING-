'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    const airports = [
      { name: 'IGT Airport', code: 'DEL', address: 'New Delhi, India', city: 'Delhi' },
      { name: 'kempogowda airport', code: 'JK', address: 'Bengaluru, India', city: 'Bengaluru' },
      { name: 'Hubbali Airport', code: 'BLR', address: 'Bengaluru, India', city: 'Bengaluru' },
      { name: 'Chhatrapati Airport', code: 'MUM', address: 'Mumbai, India', city: 'Mumbai' },
      { name: 'Rajiv Gandhi Airport', code: 'HYD', address: 'Hyderabad, India', city: 'Hyderabad' },
      { name: 'Chennai Airport', code: 'MAA', address: 'Chennai, India', city: 'Chennai' }
    ];

    for (const airport of airports) {
      await queryInterface.sequelize.query(
        `INSERT INTO "Airports" ("name", "code", "address", "cityId", "createdAt", "updatedAt")
         VALUES (?, ?, ?, (SELECT id FROM "Cities" WHERE "name" = ?), ?, ?)
         ON CONFLICT ("code") DO UPDATE SET "cityId" = EXCLUDED."cityId", "name" = EXCLUDED."name", "updatedAt" = EXCLUDED."updatedAt";`,
        {
          replacements: [
            airport.name,
            airport.code,
            airport.address,
            airport.city,
            now.toISOString(),
            now.toISOString()
          ]
        }
      );
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Airports', {
      code: ['MUM', 'HYD', 'MAA']
    });
  }
};