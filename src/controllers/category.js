const categoryModel = require('../models/category')
const createErrors = require('http-errors')
const { success, failed } = require('../helper/common')
const categoryController = {
  sort: async (req, res) => {
    try{
      const query = req.query

      const page = Number(query.page) || 1
      const limit = Number(query.limit) || 5
      const offset = (page - 1) * limit
      const sortby = query.sortby || 'name'
      const sort = query.sort.toUpperCase() || 'ASC'
      const search = query.search || ''
      const result = await categoryModel.sort({limit, offset, sort, sortby, search})
      const {rows: [count]} = await categoryModel.countCategory()
      const totalData = parseInt(count.count)
      const totalPage = Math.ceil(totalData/limit)
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage
      }
      
      return success(res, result.rows, 'success', 'Get category sort and searching successfully', pagination)
    }catch(err){
      return failed(res, err, 'failed', 'Get category sort and searching failed')
    }
  },
  getAllCategory: async (req, res) => {
    try {
      const result = await categoryModel.selectAll()
      return success(res, result.rows, 'success', 'Get all categories successfully')
    } catch (err) {
      return failed(res, err, 'failed', 'Get all categories failed')
    }
  },
  getCategory: async (req, res) => {
    const { id } = req.params
    try {
      const result = await categoryModel.select(id)
      if (result.rowCount === 0) throw new createErrors.BadRequest('Category has not been added')
      return success(res, result.rows, 'success', 'Get category based by ID successfully')
    } catch (err) {
      return failed(res, err.message, 'failed', 'Get category based by ID failed')
    }
  },
  insert: async (req, res) => {
    const { name } = req.body
    try {
      const result = await categoryModel.selectCategory(name)
      if (result.rowCount > 0) throw new createErrors.BadRequest('This category has been available')

      const data = await categoryModel.insert(name)
      return success(res, data.rows, 'success', 'Category is created')
    } catch (err) {
      return failed(res, err.message, 'failed', 'Category is not created')
    }
  },
  update: async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    try {
      const result = await categoryModel.update(id, name)
      return success(res, result, 'success', 'Category is created')
    } catch (err) {
      return failed(res, err, 'failed', 'Category is not created')
    }
  },
  delete: async (req, res) => {
    const { id } = req.params
    try {
      const result = await categoryModel.deleteCategory(id)
      return success(res, result, 'success', 'Category is deleted')
    } catch (err) {
      return failed(res, err, 'failed', 'Category is not created')
    }
  }
}

module.exports = categoryController