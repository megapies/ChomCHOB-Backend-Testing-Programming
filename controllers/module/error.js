class ErrorHandler{
  constructor() {

  }

  handle(error, res) {
    if(error.isJoi) {
      // joi error
      res.status(403).json(error)
    }else {
      res.status(500).end()
    }
  } 
}

module.exports = ErrorHandler