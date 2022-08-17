const success = (res, data, status, message, pagination)=>{
  if (pagination) {
    res.json({
      code: 200,
      status,
      data,
      pagination,
      error: null,
      message
    })
  }
  res.json({
    code: 200,
    status,
    data,
    error: null,
    message
  })
}

const failed = (res, error, status, message)=>{
  res.json({
    code: 200,
    status,
    data: null,
    error,
    message
  })
}

module.exports = {
  success,
  failed
}