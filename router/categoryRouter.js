'use strict'

const router = require('express').Router()
const CategoryController = require('../controllers/categoryController.js')

router.get('/categories', CategoryController.getCategories);
router.post('/categories', CategoryController.postCategory);
router.put('/categories/:id', CategoryController.putCategory);
router.delete('/categories/:id', CategoryController.deleteCategory);

module.exports = router;