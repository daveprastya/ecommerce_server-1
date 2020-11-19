'use strict'

const { Cart, Product, sequelize } = require('../models')

class CartController {
  static async getCarts(req, res, next){
    try {
      const data = await Cart.findAll({
        attributes: [[sequelize.fn('count', sequelize.col('ProductId')), 'count'], 'UserId'],
        group: ['Product.id', 'UserId'],
        include: ['Product']
      })
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async postCart(req, res, next){
    const objParams = {
      UserId: req.loggedInUser.id,
      ProductId: req.body.ProductId
    }
    try {
      const data = await Cart.create(objParams)
      res.status(201).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async putCart(req, res, next) {
    const idParams = req.params.id
    const objParams = {
      UserId: req.body.UserId,
      ProductId: req.body.ProductId
    }
    try {
      const data = await Cart.update(objParams, {
        where: { id: idParams}
      })
      res.status(200).json(data);
    } catch (err) {
      next(err);
    } 
  }

  static async deleteCart(req, res, next){
    const idParams = req.params.id
    try {
      const data = await Cart.destroy({
        where: { ProductId: idParams}
      })
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static decreaseCart(req, res, next) {
    const idParams = req.params.id
    Cart.findAll({ where: { ProductId: idParams }})
    .then(data => {
      return Cart.destroy({ where: { id: data[0].id }})
    })
    .then(data1 => {
      res.status(200).json('decrease cart success!')
    })
    .catch(err => {
      next(err);
    })
  }
}

module.exports = CartController;