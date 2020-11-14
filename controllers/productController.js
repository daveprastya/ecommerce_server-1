'use strict'

const { Product, Category } = require("../models");

class ProductController{
  static async postProducts(req, res, next){
    const objParams = {
      name: req.body.name,
      imgUrl: req.body.imgUrl,
      price: req.body.price,
      stock: req.body.stock,
      CategoryId: req.body.CategoryId
    }
    try {
      const data = await Product.create(objParams);
      res.status(201).json(data);
    } catch (err) {
      next(err.errors[0]);
      
    }
  }

  static async getProducts(req, res, next){
    try {
      const data = await Product.findAll({ include: [Category] })
      res.status(200).json(data);
    } catch (err) {
      next(err.errors[0]);
    }
  }

  static async deleteProducts(req, res, next){
    const idParams = req.params.id;
    try {
      const data = await Product.destroy({
        where: { id: idParams}
      });
      res.status(200).json(data);
    } catch (err) {
      next(err.errors[0]);
    }
  }

  static async putProducts(req, res, next){
    const idParams = req.params.id;
    const objParams = {
      name: req.body.name,
      imgUrl: req.body.imgUrl,
      price: req.body.price,
      stock: req.body.stock,
      CategoryId: req.body.CategoryId
    }
    try {
      const data = await Product.update(objParams, {
        where: { id: idParams }
      })
      res.status(200).json(data);
    } catch (err) {
      next(err.errors[0]);
    }
  }
}

module.exports = ProductController;