'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Username is required!"
        },
        notEmpty:{
          args: true,
          msg: "Username is required!"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required!"
        },
        notNull: {
          args: true, 
          msg: "Email is required!"
        },
        isEmail:{
          args: true,
          msg: "Must in Email Format!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true, 
          msg: "Password is required!"
        },
        notNull:{
          args: true,
          msg: "Password is required!"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};