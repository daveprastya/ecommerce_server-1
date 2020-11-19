'use strict'

const router = require('express').Router()
const CartController = require('../controllers/cartController.js')

router.get('/carts', CartController.getCarts);
router.post('/carts', CartController.postCart);
// router.put('/carts/:id', CartController.putCart);
router.delete('/carts/:id', CartController.deleteCart);
router.delete('/carts/decrease/:id', CartController.decreaseCart);

module.exports = router