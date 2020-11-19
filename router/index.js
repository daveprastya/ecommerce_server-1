'use strict'

const router = require("express").Router();
const userRouter = require("./userRouter.js");
const productRouter = require("./productRouter.js");
const bannerRouter = require("./bannerRouter.js");
const categoryRouter = require("./categoryRouter.js");
const cartRouter = require("./cartRouter.js");
const authentication = require("../middlewares/authentication.js");

router.use(userRouter);
router.use(categoryRouter);
router.use(productRouter);
router.use(bannerRouter);
router.use(authentication);
router.use(cartRouter);



module.exports = router;