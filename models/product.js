'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category)
    }
  };
  Product.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          args: true,
          msg: "Product Name is required!"
        },
        notEmpty: {
          args : true,
          msg: "Product Name is required!"
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "ImgUrl is required!"
        },
        notEmpty: {
          args: true,
          msg: "ImgUrl is required!"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Price is required!"
        },
        notEmpty: {
          args: true,
          msg: "Price is required!"
        },
        isNumeric: {
          args: true,
          msg: "Price must be in numeric!"
        },
        min:{
          args: [0],
          msg: "Price must be greater than 0!"
        }
      }
    },
    stock: {
     type: DataTypes.INTEGER,
     allowNull: false,
     validate: {
       notNull: {
         args: true,
         msg: "Stock is required!"
       },
       notEmpty: {
         args: true,
         msg: "Stock is required!"
       },
       isNumeric:{
         args: true,
         msg: "Stock must be in numeric!"
       },
       min:{
         args: [0],
         msg: "Stock must be greater than 0!"
       }
     }
    },
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};