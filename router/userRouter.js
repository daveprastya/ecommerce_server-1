'use strict'

const UserController = require("../controllers/userController.js")

const router = require("express").Router();

router.post("/login", UserController.postLogin);
router.post("/register", UserController.postRegister);

module.exports = router;