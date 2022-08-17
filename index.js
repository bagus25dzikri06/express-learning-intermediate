require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const xss = require('xss-clean')
const createError = require('http-errors')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const ProductRouter = require('./src/routes/product')
const CategoryRouter = require('./src/routes/category')
const UserRouter = require('./src/routes/user')

const PORT = process.env.PORT || 5000
const DB_HOST = process.env.DB_HOST

app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(cors())
app.use(morgan('dev'))

app.use('/products', ProductRouter)
app.use('/category', CategoryRouter)
app.use('/users', UserRouter)
app.use('/img', express.static('./upload'))

app.use(bodyParser.json())
app.all('*', (req, res, next) => {
  next(new createError.NotFound())
})
app.use((err,req,res)=>{
  const messageError = err.message || "internal server error"
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message : messageError
  })

})
app.listen(3000, () => {
  console.log(`server running on http://${DB_HOST}:${PORT}`)
})