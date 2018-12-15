const validator = require('controllers/module/validate')
const ErrorHandler = require('controllers/module/error')
const models = require('models/index.2.js')()
const dbConnector = require('controllers/module/db')(models)

const AuthManager = require('controllers/manager/auth')
class CoreController {
  constructor() {
    console.log('core controller')
    this.errorHandler = new ErrorHandler()
    this.authManager = new AuthManager(dbConnector, this.errorHandler)
  }

  async register(req, res) {
    try {
      const { error, value } = validator.validateRegister(req)
      if (error) throw error
      const user = await this.authManager.register(value)
      res.json(user)
    } catch (error) {
      this.errorHandler.handle(error)
    }
  }

  async login(req, res) {
    try {
      const { error, value } = validator.validateLogin(req)
      if (error) throw error
      const user = await this.authManager.login(value)
      res.json(user)
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