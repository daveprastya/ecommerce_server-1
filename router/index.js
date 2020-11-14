'use strict'

const router = require("express").Router();
const userRouter = require("./userRouter.js");
const productRouter = require("./productRouter.js");
const bannerRouter = require("./bannerRouter.js");
const categoryRouter = require("./categoryRouter.js");
const authentication = require("../middlewares/authentication.js");

router.use(userRouter);
router.use(authentication);
router.use(productRouter);
router.use(categoryRouter);
router.use(bannerRouter);



module.exports = router;