const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const { protect } = require('../middleware/auth')

router
  .post('/register', userController.register)
  .post('/login', userController.login)
  .post('/refresh-token', userController.refreshToken)
  .get('/profile', protect, userController.profile)

module.exports = router