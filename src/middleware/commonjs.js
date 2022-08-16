const validate = (req, res, next) => {
  const { name, stock, price } = req.body
  try {
    if (name === '' || stock === '' || price === '') throw new Error('All data must be filled')
    if (isNaN(stock) || isNaN(price)) throw new Error('Input bukan angka')
    if (!isNaN(name)) throw new Error('Input bukan text')
  } catch (error) {
    res.send(`${error}`)
  }
  next()
}

module.exports = validate