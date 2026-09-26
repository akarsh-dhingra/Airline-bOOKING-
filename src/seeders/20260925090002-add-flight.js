'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Flights', null, {});

    const flights = [
      {
        flightNumber: 'Boe-101',
        airplaneId: 18,
        departureAirportId: 'DEL',
        arrivalAirportId: 'JK',
        departureTime: '2026-09-19T06:00:00.000Z',
        arrivalTime: '2026-09-19T08:30:00.000Z',
        price: 4000,
        boardingGate: 'A1',
        totalSeats: 180,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flightNumber: 'Ab-202',
        airplaneId: 17,
        departureAirportId: 'JK',
        arrivalAirportId: 'BLR',
        departureTime: '2026-09-20T03:30:00.000Z',
        arrivalTime: '2026-09-20T05:30:00.000Z',
        price: 3500,
        boardingGate: 'B2',
        totalSeats: 220,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flightNumber: 'Boe-303',
        airplaneId: 19,
        departureAirportId: 'MUM',
        arrivalAirportId: 'DEL',
        departureTime: '2026-09-21T08:30:00.000Z',
        arrivalTime: '2026-09-21T11:00:00.000Z',
        price: 5000,
        boardingGate: 'C3',
        totalSeats: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flightNumber: 'Ab-404',
        airplaneId: 17,
        departureAirportId: 'BLR',
        arrivalAirportId: 'HYD',
        departureTime: '2026-09-22T02:30:00.000Z',
        arrivalTime: '2026-09-22T04:15:00.000Z',
        price: 3000,
        boardingGate: 'D4',
        totalSeats: 190,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flightNumber: 'Boe-505',
        airplaneId: 19,
        departureAirportId: 'HYD',
        arrivalAirportId: 'MAA',
        departureTime: '2026-09-23T12:30:00.000Z',
        arrivalTime: '2026-09-23T14:20:00.000Z',
        price: 2600,
        boardingGate: 'E5',
        totalSeats: 210,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flightNumber: 'Ab-606',
        airplaneId: 18,
        departureAirportId: 'DEL',
        arrivalAirportId: 'MUM',
        departureTime: '2026-09-24T00:30:00.000Z',
        arrivalTime: '2026-09-24T03:00:00.000Z',
        price: 4200,
        boardingGate: 'F6',
        totalSeats: 175,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Flights', flights, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Flights', {
      flightNumber: ['Boe-101', 'Ab-202', 'Boe-303', 'Ab-404', 'Boe-505', 'Ab-606']
    });
  }
};