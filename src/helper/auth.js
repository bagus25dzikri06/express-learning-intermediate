const jwt = require('jsonwebtoken')
const generateToken = (payload) => {
  const verifyTime = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, process.env.SECRET_KEY_JWT, verifyTime)
}

const generateRefreshToken = (payload) => {
  const verifyTime = {
    expiresIn: '1 day'
  }
  return jwt.sign(payload, process.env.SECRET_KEY_JWT, verifyTime)
}

module.exports = {
  generateToken,
  generateRefreshToken
}