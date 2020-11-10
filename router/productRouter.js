'use strict'

const router = require("express").Router();
const ProductController = require("../controllers/productController.js");
const productController = require("../controllers/productController.js");
const authorization = require("../middlewares/authorization.js");


router.use(authorization);
router.get("/products", ProductController.getProducts)
router.post("/products", productController.postProducts);
router.put("/products/:id", ProductController.putProducts);
router.delete("/products/:id", ProductController.deleteProducts);

module.exports = router;