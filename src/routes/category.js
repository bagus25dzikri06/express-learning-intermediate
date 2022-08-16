const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category')

router
  .get('/all', categoryController.getAllCategory)
  .get('/', categoryController.sort)
  .get('/:id', categoryController.getCategory)
  .post('/', categoryController.insert)
  .put('/:id', categoryController.update)
  .delete('/:id', categoryController.delete)

module.exports = router