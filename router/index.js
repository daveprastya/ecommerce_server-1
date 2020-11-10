'use strict'

const router = require("express").Router();
const userRouter = require("./userRouter.js");
const productRouter = require("./productRouter.js");
const authentication = require("../middlewares/authentication.js");

router.use(userRouter);
router.use(authentication);
router.use(productRouter);


module.exports = router;