'use strict'

const BannerController = require('../controllers/bannerController.js')

const router = require('express').Router()

router.get('/banners', BannerController.getBanners);
router.post('/banners', BannerController.postBanners);
router.put('/banners/:id', BannerController.putBanners);
router.delete('/banners/:id', BannerController.deleteBanners);

module.exports = router