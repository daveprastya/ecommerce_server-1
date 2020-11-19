'use strict'

const router = require("express").Router();
const ProductController = require("../controllers/productController.js");
const productController = require("../controllers/productController.js");
const authorization = require("../middlewares/authorization.js");


router.get("/products", ProductController.getProducts);
router.get("/products/:id", ProductController.getProductbyCategory);
router.put("/products/:id", ProductController.putProducts);
// router.use(authorization);
router.post("/products", authorization, productController.postProducts);
router.delete("/products/:id", authorization, ProductController.deleteProducts);

module.exports = router;