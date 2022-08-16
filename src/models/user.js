const Pool = require('../config/db')
const findEmail = (email) => {
  return Pool.query(`SELECT * FROM users WHERE email='${email}'`)
}
const create = (fullname, phone, email, password) => {
  return Pool.query(`INSERT INTO users(
    fullname, phone, email, password
  ) VALUES (
    '${fullname}', '${phone}', '${email}', '${password}'
  ) RETURNING *`)
}

module.exports = {
  findEmail,
  create
}