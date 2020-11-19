'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bycrpt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Cart)
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
    hooks: {
      beforeCreate: (user, options) => {
        user.role = 'user'
        user.password = hashPassword(user.password)
      }
    },
    modelName: 'User',
  });
  return User;
};