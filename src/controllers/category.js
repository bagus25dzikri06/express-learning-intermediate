const categoryModel = require('../models/category')
const createErrors = require('http-errors')
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
      
      res.status(200).json({
        pagination:{
          currentPage: page,
          limit: limit,
          totalData: totalData,
          totalPage: totalPage
        },
        data: result.rows
      })
    }catch(error){
      console.log(error);
    }
  },
  getAllCategory: (req, res) => {
    categoryModel.selectAll()
      .then(
        result => res.json(result.rows)
      )
      .catch(err => res.send(err)
      )
  },
  getCategory: (req, res) => {
    const id = Number(req.params.id)
    categoryModel.select(id)
      .then(
        result => res.json(result.rows)
      )
      .catch(err => res.send(err)
      )
  },
  insert: async (req, res) => {
    const { name } = req.body
    try {
      const result = await categoryModel.selectCategory(name)
      if (result.rowCount > 0) throw new createErrors.BadRequest('This category has been available')

      const data = await categoryModel.insert(name)
      res.status(201).json({
        message: 'Category is created',
        categoryData: data.rows[0]
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  update: async (req, res) => {
    const id = Number(req.params.id)
    const name = req.body.name
    try {
      const result = await categoryModel.update(id, name)
      res.status(200).json({
        message: 'Category is updated',
        data: result
      })
    } catch (err) {
      res.status(500).json({
        message: err
      })
    }
  },
  delete: async (req, res) => {
    const id = Number(req.params.id)
    try {
      const result = await categoryModel.deleteCategory(id)
      res.status(200).json({
        message: 'Category is deleted',
        data: result
      })
    } catch (err) {
      res.status(500).json({
        message: err
      })
    }
  }
}

module.exports = categoryController