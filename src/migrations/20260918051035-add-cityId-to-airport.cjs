'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Airports', 'cityId', {
      type: Sequelize.INTEGER,
      allowNull: true, // change to false if required
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Airports', 'cityId');
  } 
};
