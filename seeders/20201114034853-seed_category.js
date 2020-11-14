'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categoriesObj = [
      {
        id: 1,
        name: 'Fashion',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 2,
        name: 'Handphone & Tablet',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 3,
        name: 'Komputer & Laptop',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 4,
        name: 'Buku',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 5,
        name: 'Electronik',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 6,
        name: 'Kecantikan',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 7,
        name: 'Kesehatan',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 8,
        name: 'Logam Mulia',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 9,
        name: 'Dapur',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 10,
        name: 'Otomotif',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 11,
        name: 'Rumah',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 12,
        name: 'Makanan & Minuman',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 13,
        name: 'Mainan',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 14,
        name: 'Kamera',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Categories', categoriesObj, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
