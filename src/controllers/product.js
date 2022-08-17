const productModel = require('../models/product')
const createErrors = require('http-errors')
const commonHelper = require('../helper/common')
const productController = {
  sort: async (req, res) => {
    try{
      const query = req.query

      const page = Number(query.page) || 1
      const limit = Number(query.limit) || 5
      const offset = (page - 1) * limit
      const sortby = query.sortby || 'name'
      const sort = query.sort.toUpperCase() || 'ASC'
      const search = query.search || ''
      const result = await productModel.sort({limit, offset, sort, sortby, search})
      const {rows: [count]} = await productModel.countProduct()
      const totalData = parseInt(count.count)
      const totalPage = Math.ceil(totalData/limit)
      
      return commonHelper.response(res, result.rows, 200, null, {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage
      })
    }catch(err){
      return commonHelper.response(res, err, 500)
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const result = await productModel.selectAll()
      return commonHelper.response(res, result.rows, 200)
    } catch (err) {
      return commonHelper.response(res, err, 500)
    }
  },
  getProduct: async (req, res) => {
    const { id } = req.params
    try {
      const result = await productModel.selectProduct(id)
      if (result.rowCount === 0) throw new createErrors.BadRequest('Category has not been added')
      return commonHelper.response(res, result.rows, 200)
    } catch (err) {
      return commonHelper.response(res, err, 500)
    }
  },
  insert: async (req, res) => {
    const { name, stock, price, description } = req.body
    const photo = req.file.filename
    const PORT = process.env.PORT || 5000
    const DB_HOST = process.env.DB_HOST || 'localhost'

    try {
      const data = await productModel.insert(name, stock, price, `http://${DB_HOST}:${PORT}/img/${photo}`, description)
      return commonHelper.response(res, data.rows, 201, 'Product is added')
    } catch (err) {
      return commonHelper.response(res, err.message, 500)
    }
  },
  update: async (req, res) => {
    const { name, stock, price, description } = req.body
    const { id } = req.params
    const photo = req.file.filename
    const PORT = process.env.PORT || 5000
    const DB_HOST = process.env.DB_HOST || 'localhost'

    try {
      const result = await productModel.select(id)
      if (result.rowCount === 0) throw new createErrors.Forbidden('Product ID not found')

      const data = await productModel.update(id, name, stock, price, `http://${DB_HOST}:${PORT}/img/${photo}`, description)
      return commonHelper.response(res, data.rows, 201, 'Product is updated')
    } catch (err) {
      return commonHelper.response(res, err.message, 500)
    }
  },
  delete: async (req, res) => {
    const { id } = req.params
    try {
      const result = await productModel.deleteProduct(id)
      return commonHelper.response(res, result, 200, 'Product is deleted')
    } catch (err) {
      return commonHelper.response(res, err, 500)
    }
  }
}

module.exports = productController