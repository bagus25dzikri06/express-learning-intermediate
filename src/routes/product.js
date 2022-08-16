const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')
const commonMiddleware = require('../middleware/commonjs')

router
  .get('/', productController.getAllProduct)
  .get('/:id', productController.getProduct)
  .post('/', commonMiddleware, productController.insert)
  .put('/:id', productController.update)
  .delete('/:id', productController.delete)

module.exports = router