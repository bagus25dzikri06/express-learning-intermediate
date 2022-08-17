const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category')
const { protect } = require('../middleware/auth')

router
  .get('/all', protect, categoryController.getAllCategory)
  .get('/', protect, categoryController.sort)
  .get('/:id', protect, categoryController.getCategory)
  .post('/', protect, categoryController.insert)
  .put('/:id', protect, categoryController.update)
  .delete('/:id', protect, categoryController.delete)

module.exports = router