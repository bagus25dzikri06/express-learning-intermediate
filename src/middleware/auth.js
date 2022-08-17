const jwt = require('jsonwebtoken')
const createErrors = require('http-errors')
const protect = (req, res, next) => {
  try {
    let { authorization } = req.headers
    if (authorization) {
      let token = authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)
      req.payload = decoded
      next()
    } else {
      res.json({
        message: 'Server need token'
      })
    }
  } catch (err) {
    if (err && err.name === 'JsonWebTokenError') {
      throw new createErrors.BadRequest('Token invalid')
    } else if (err && err.name === 'TokenExpiredError') {
      throw new createErrors.BadRequest('Token expired')
    } else {
      throw new createErrors.BadRequest('Token not actived')
    }
  }
}

module.exports = {
  protect
}