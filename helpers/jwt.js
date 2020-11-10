'use strict'

const jwt = require("jsonwebtoken");

function signToken(obj){
  const token = jwt.sign(obj, process.env.SECRET);
  return token;
}

function verifyToken(token){
  const decoded = jwt.verify(token, process.env.SECRET);
  return decoded;
}

module.exports = {
  signToken,
  verifyToken
}