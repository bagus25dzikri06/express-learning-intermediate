const { Pool } = require('pg')
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

pool.connect((err) => {
  console.log(err ? err.message : 'PostgreSQL is connected');
})

module.exports = pool