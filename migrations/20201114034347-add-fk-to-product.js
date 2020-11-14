'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.addConstraint('Products',{
     fields: ['CategoryId'],
     type: 'foreign key',
     name: 'custom_fkey_category_to_products',
     references: {
       table: 'Categories',
       field: 'id'
     },
     onDelete: 'CASCADE',
     onUpdate: 'CASCADE'
   })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Products','custom_fkey_category_to_products')
  }
};
