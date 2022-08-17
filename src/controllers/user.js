const userModel = require('../models/user')
const createErrors = require('http-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const commonHelper = require('../helper/common')
const authHelper = require('../helper/auth')
const userController = {
  register: async (req, res) => {
    const { fullname, phone, email, password, role } = req.body
    let passwordHash = bcrypt.hashSync(password)

    try {
      if (fullname === '' || phone === '' || email === '' || 
        password === '' || role === ''
      ) throw new createErrors.Forbidden('All data must be filled in')
      const result = await userModel.findEmail(email)
      if (result.rowCount > 0) throw new createErrors.Forbidden('E-mail has been already used')
      if (password.length < 8) throw new createErrors.Forbidden('Password length should equal or be more than 8')

      const data = await userModel.create(fullname, phone, email, passwordHash, role)
      return commonHelper.response(res, data.rows[0], 201, 'User is registered')
    } catch (err) {
      return commonHelper.response(res, err.message, 500)
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body
    const { rows: [user] } = await userModel.findEmail(email)
    let isValidPassword = bcrypt.compareSync(password, user.password)

    try {
      if (email === '' || password === '') throw new createErrors.Forbidden('All data must be filled in')
      if (!user) throw new createErrors.Forbidden('E-mail is invalid or unregistered')
      if (!isValidPassword) throw new createErrors.Forbidden('Password is invalid')

      delete user.password

      const payload = {
        email: user.email,
        role: user.role
      }
      user.token = authHelper.generateToken(payload)
      user.refreshToken = authHelper.generateRefreshToken(payload)

      return commonHelper.response(res, user, 201, 'User is logged in successfully')
    } catch (err) {
      return commonHelper.response(res, err.message, 500)
    }
  },
  refreshToken: (req, res) => {
    const { refreshToken } = req.body
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_JWT)
    const payload = {
      email: decoded.email,
      role: decoded.role
    }
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.generateRefreshToken(payload)
    }
    return commonHelper.response(res, result, 200)
  },
  profile: async (req, res) => {
    const { email } = req.payload
    const { rows: [user] } = await userModel.findEmail(email)

    delete user.password

    return commonHelper.response(res, user, 200)
  }
}

module.exports = userController