'use strict'

const { User } = require("../models");
const { comparePassword } = require("../helpers/bycrpt.js");
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
        throw { msg: "Wrong Email / Password!", status: 401 };
      }
      else if(!comparePassword(objParam.password, data.password)){
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
}

module.exports = UserController;