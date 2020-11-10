'use strict'

function authorization(req, res, next){
  try {
    const dataUser = req.loggedInUser;
    if(dataUser.role === "admin"){
      next();
    }
    else{
      throw { msg: "Authorization Failed!", status: 401 };
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authorization