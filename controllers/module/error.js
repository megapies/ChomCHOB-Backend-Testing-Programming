class ErrorHandler{
  constructor() {

  }

  handle(error, res) {
    console.log(error)
    if(error.isJoi) {
      // joi error
      res.status(403).json(error)
    }else if(error.code) {
      res.status(error.code).json(error.data)
    } else {
      res.status(400).end('Unhandle error')
    }
  }
  
  createDataNotFound() {
    return {
      code: 404,
      data: {
        msg: 'data not found'
      }
    }
  }

  createWrongData() {
    return {
      code: 403,
      data: {
        msg: 'wrong data'
      }
    }
  }
}

module.exports = ErrorHandler