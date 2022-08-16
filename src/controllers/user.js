const userModel = require('../models/user')
const createErrors = require('http-errors')
const bcrypt = require('bcryptjs')
const commonHelper = require('../helper/common')
//const authHelper = require('../helper/auth')
const userController = {
  register: async (req, res) => {
    const { fullname, phone, email, password } = req.body
    let passwordHash = bcrypt.hashSync(password)

    try {
      const result = await userModel.findEmail(email)
      if (result.rowCount > 0) throw new createErrors.BadRequest('E-mail has been already used')
      
      const data = await userModel.create(fullname, phone, email, passwordHash)
      return commonHelper.response(res, data.rows[0], 201, 'User is registered')
    } catch (err) {
      return commonHelper.response(res, err.message, 500, null)
    }
  },
  login: async (req, res, next) => {
    const { email, password } = req.body
    const result = await userModel.findEmail(email)
    let isValidPassword = bcrypt.compareSync(password, result.rows[0].password)
    if (result.rowCount === 0) {
      return next(new createErrors(403, 'E-mail is not valid or not registered'))
    }
    if (!isValidPassword) {
      return next(new createErrors(401, 'Password is not valid'))
    }
  }
}

module.exports = userController