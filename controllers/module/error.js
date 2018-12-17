class ErrorHandler{
  constructor() {

  }

  handle(error, res) {
    // console.log(error)
    if(error.isJoi) {
      // joi error
      res.status(403).json({
        msg: 'Invalida input',
        detail: error.details
      })
    }else if(error.code) {
      res.status(error.code).json(error.data)
    } else {
      res.status(400).json({
        msg: error.name,
        detail: error.errors
      })
    }
  }
  
  createInsufficient() {
    return {
      code: 403,
      data: {
        msg: 'Insufficient currency'
      }
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

  createAccessDenie() {
    return {
      code: 401,
      data: {
        msg: 'Access denie'
      }
    }
  }
}

module.exports = ErrorHandler