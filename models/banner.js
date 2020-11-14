'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Banner.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          args: true,
          msg: "Title is Required!"
        },
        notNull: {
          args: true, 
          msg: "Title is Required!"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Status is Required!"
        },
        notNull: {
          args: true,
          msg: "Status is Required!"
        }
      }
    },
    img_Url: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty: {
          args: true, 
          msg: "Image Url is Required!"
        },
        notNull: {
          args: true, 
          msg: "Image Url is Required!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};