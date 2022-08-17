const Pool = require('../config/db')
const selectAll = () => {
  return Pool.query(`SELECT * FROM products`)
}
const sort = ({limit, offset, sort, sortby, search}) => {
  return Pool.query(`SELECT * FROM products 
  WHERE LOWER(name) LIKE LOWER('%${search}%')
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const select = (id) => {
  return Pool.query(`SELECT * FROM products 
  WHERE id=${id}`)
}
const selectProduct = (name) => {
  return Pool.query(`SELECT * FROM products 
  WHERE name='${name}'`)
}
const insert = (name, stock, price, photo, description) => {
  return Pool.query(`INSERT INTO products(
    name, stock, price, photo, description
  ) VALUES (
    '${name}', '${stock}', '${price}', '${photo}', '${description}'
  ) RETURNING *`)
}
const update = (id, name, price, photo, description) => {
  return Pool.query(`UPDATE products SET 
  name='${name}', price='${price}', photo='${photo}', description='${description}'
  WHERE id='${id}'`)
}
const deleteProduct = (id) => {
  return Pool.query(`DELETE FROM products WHERE id=${id}`)
}

const countProduct = () =>{
  return Pool.query('SELECT COUNT(*) FROM products')
}

module.exports = {
  selectAll,
  sort,
  select,
  selectProduct,
  insert,
  update,
  deleteProduct,
  countProduct
}