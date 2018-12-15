const validator = require('controllers/module/validate')
const ErrorHandler = require('controllers/module/error')
const models = require('models/index.2.js')()
const dbConnector = require('controllers/module/db')(models)

const AuthManager = require('controllers/manager/auth')
const CurrencyManager = require('controllers/manager/currency')
const ExchangeManager = require('controllers/manager/exchangeRate')
class CoreController {
  constructor() {
    this.errorHandler = new ErrorHandler()
    this.authManager = new AuthManager(dbConnector, this.errorHandler)
    this.currencyManager = new CurrencyManager(dbConnector, this.errorHandler)
    this.exchangeRateManager = new ExchangeManager(dbConnector, this.errorHandler)
  }

  async register(req, res) {
    try {
      const { error, value } = validator.validateRegister(req)
      if (error) throw error
      const user = await this.authManager.register(value)
      res.json(user)
    } catch (error) {
      this.errorHandler.handle(error, res)
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
    try {
      const { error, value } = validator.validateCreateCurrency(req)
      if(error) throw error

      const isAdmin = await this.authManager.checkRole(value.accessToken, 'ADMIN')
      if(!isAdmin){
        throw this.errorHandler.createAccessDenie()
      }
      
      const currency = await this.currencyManager.createCurrency(value)
      res.json(currency)
    } catch (error) {
      this.errorHandler.handle(error, res)
    }
  }

  async changeExchangeRate(req, res) {
    try {
      const { error, value } = validator.validateModifyExchangeRate(req)
      if(error) throw error

      const isAdmin = this.authManager.checkRole(value.accessToken, 'ADMIN')
      if(!isAdmin) {
        throw this.errorHandler.createAccessDenie()
      }

      const exchangeRate = await this.exchangeRateManager.modifyExchangeRate(value)
      res.json(exchangeRate)
    } catch (error) {
      this.errorHandler.handle(error)
    }
  }

  async getExchangeRate(req, res) {
    try {
      const { error, value } = validator.validateGetExchangeRate(req)
      if(error) throw error
      
      const exchangeRate = await this.exchangeRateManager.getExchangeRate(value)
      res.json(exchangeRate)
      
    } catch (error) {
      
    }
  }
}

CoreController.instance = CoreController.instance || new CoreController()

module.exports = CoreController