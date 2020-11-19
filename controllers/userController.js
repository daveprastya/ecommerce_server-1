'use strict'

const { User } = require("../models");
const { comparePassword, hashPassword } = require("../helpers/bycrpt.js");
const { signToken } = require("../helpers/jwt");

class UserController{
  static async postLogin(req, res, next){
    const objParam = {
      email: req.body.email,
      password: req.body.password
    }
    try {
      const data = await User.findOne({
        where: { email: objParam.email }
      })
      
      if(!data){
        console.log('di data not found');
        throw { msg: "Wrong Email / Password!", status: 401 };
      }
      else if(!comparePassword(objParam.password, data.password)){
        console.log('di compare password', data);
        throw { msg: "Wrong Email / Password!", status: 401 };
      }
      else if(data.role === 'admin'){
        console.log('di role')
        throw { msg: "Wrong Email / Password!", status: 401 };
      }
      else{
        const token = signToken({
          id: data.id,
          username: data.username,
          email:data.email,
          role: data.role
        })
        const userDetail = {
          token: token,
          username: data.username
        }
        res.status(200).json(userDetail);
      }
    } catch (err) {
      next(err);
    }
  }

  static async postRegister(req, res, next) {
    const objParam = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    try {
      const data = await User.create(objParam)
      res.status(201).json(data)
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;