'use strict'

const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models")

async function authentication(req, res, next){
  const { token } = req.headers;
  try {
    if(!token){
      throw { msg: "Authentication Failed!", status: 401 };
    }
    else{
      const decoded = verifyToken(token);
      const data = await User.findOne({
        where: { email: decoded.email}
      });
      if(!data){
        throw { msg: "Authentication Failed!", status: 401 };
      }
      else{
        req.loggedInUser = decoded;
        next();
      }
    }
  } catch (err) {
    next(err);
  }

}

module.exports = authentication;