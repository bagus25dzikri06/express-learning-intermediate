const Pool = require('../config/db')
const selectAll = () => {
  return Pool.query(`SELECT * FROM category`)
}
const sort = ({limit, offset, sort, sortby, search}) => {
  return Pool.query(`SELECT * FROM category 
  WHERE LOWER(name) LIKE LOWER('%${search}%')
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const select = (id) => {
  return Pool.query(`SELECT * FROM category 
  WHERE id=${id}`)
}
const selectCategory = (name) => {
  return Pool.query(`SELECT * FROM category 
  WHERE name='${name}'`)
}
const insert = (name) => {
  return Pool.query(`INSERT INTO category(name) VALUES ('${name}') RETURNING *`)
}
const update = (id, name) => {
  return Pool.query(`UPDATE category SET name='${name}' 
  WHERE id='${id}'`)
}
const deleteCategory = (id) => {
  return Pool.query(`DELETE FROM category WHERE id=${id}`)
}

const countCategory = () =>{
  return Pool.query('SELECT COUNT(*) FROM category')
}

module.exports = {
  selectAll,
  sort,
  select,
  selectCategory,
  insert,
  update,
  deleteCategory,
  countCategory
}