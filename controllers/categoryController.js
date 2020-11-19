'use strict'

const { Category } = require('../models')

class CategoryController {
  static async getCategories(req, res, next){
    try {
      const data = await Category.findAll();
      console.log(data);
      res.status(200).json(data);
    } catch (err) {
      next(err.errors[0]);
    }
  }

  static async postCategory(req, res, next){
    const payload = {
      name: req.body.name
    }
    try {
      const data = await Category.create(payload);
      res.status(201).json(data);
    } catch (err) {
      next(err.errors[0]);
    }
  }

  static async putCategory(req, res, next){
    const idparams = req.params.id;
    const payload = {
      name: req.body.name
    }
    try {
      const data = await Category.update(payload, {
        where: { id: idparams }
      })
      res.status(200).json(data);
    } catch (err) {
      next(err.errors[0]);
    }
  }

  static async deleteCategory(req, res, next){
    const idparams = req.params.id;
    try {
      const data = await Category.destroy({
        where: { id: idparams }
      })
      res.status(200).json('category berhasil di delete');
    } catch (err) {
      next(err.errors[0]);
    }
  }
}

module.exports = CategoryController;