const validator = require('controllers/module/validate')
const ErrorHandler = require('controllers/module/error')
class CoreController {
  constructor() {
    console.log('core controller')
    this.errorHandler = new ErrorHandler()
  }

  async login(req, res) {
    try {
      const { error, value } = validator.validateLogin(req)
      if (error) throw error

      res.end('hi')
    } catch(error) {
      this.errorHandler.handle(error, res)
    }
  }

  async increaseBalance(req, res) {

  }

  async decreaseBalance(req, res) {

  }

  async getBalance(req, res) {

  }

  async getCurrencies(req, res) {
    
  }

  async createCurrency(req, res) {

  }

  async changeExchangeRate(req, res) {

  }

  async getExchangeRate(req, res) {

  }
}

CoreController.instance = CoreController.instance || new CoreController()

module.exports = CoreController