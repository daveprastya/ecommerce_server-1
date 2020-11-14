'use strict'

const { Banner } = require('../models')

class BannerController {
  static async getBanners(req, res, next){
    try {
      const data = await Banner.findAll();
      res.status(200).json(data);
    } catch (err) {
      next(err.errors[0]);
    }
  }

  static async postBanners(req, res, next){
    const payload = {
      title: req.body.title,
      status: req.body.status,
      img_Url: req.body.img_Url
    }
    console.log(payload);
    try {
      const data = await Banner.create(payload);
      res.status(201).json(data);
    } catch (err) {
      next(err.errors[0]);
    }
  }

  static async putBanners(req, res, next){
    const idParams = req.params.id;
    const payload = {
      title: req.body.title,
      status: req.body.status,
      img_Url: req.body.img_Url
    } 
    try{
      const data = await Banner.update(payload, {
        where: { id: idParams }
      })
      res.status(200).json(data);
    } catch (err) {
      next(err.errors[0]);
    }
  }

  static async deleteBanners(req, res, next){
    const idParams = req.params.id;
    try {
      const data = await Banner.destroy({
        where: { id: idParams }
      })
      res.status(200).json(data)
    } catch (err) {
      next(err.errors[0]);
    }
  }
}

module.exports = BannerController