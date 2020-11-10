'use strict';

const { hashPassword } = require("../helpers/bycrpt.js");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dataobjAdmin = [{
      username: "dave prastya",
      email: "dave.admin@email.com",
      password: hashPassword("dave123"),
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: "dave customer",
      email: "dave.user@email.com",
      password: hashPassword("dave123"),
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    await queryInterface.bulkInsert("Users", dataobjAdmin, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
