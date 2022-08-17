const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')
const { protect } = require('../middleware/auth')
const upload = require('../middleware/upload')

router
  .get('/all', protect, productController.getAllProducts)
  .get('/', protect, productController.sort)
  .get('/:id', protect, productController.getProduct)
  .post('/', protect, upload.single('photo'), productController.insert)
  .put('/:id', protect, upload.single('photo'), productController.update)
  .delete('/:id', protect, productController.delete)

module.exports = router