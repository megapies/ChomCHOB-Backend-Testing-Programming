const validator = require('controllers/module/validate')
const ErrorHandler = require('controllers/module/error')
const { models, sequelize } = require('models/index.js')()
const dbConnector = require('controllers/module/db')(models, sequelize)

const AuthManager = require('controllers/manager/auth')
const CurrencyManager = require('controllers/manager/currency')
const ExchangeManager = require('controllers/manager/exchangeRate')
const WalletManager = require('controllers/manager/wallet')
const TransactionManager = require('controllers/manager/transaction')

class CoreController {
  constructor() {
    this.errorHandler = new ErrorHandler()
    this.authManager = new AuthManager(dbConnector, this.errorHandler)
    this.currencyManager = new CurrencyManager(dbConnector, this.errorHandler)
    this.exchangeRateManager = new ExchangeManager(dbConnector, this.errorHandler)
    this.walletManager = new WalletManager(dbConnector, this.errorHandler)
    this.transactionManager = new TransactionManager(dbConnector, this.errorHandler)
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
    try {
      const { error, value } = validator.validateIncreaseWallet(req)
      if (error) throw error
      
      const isAdmin = await this.authManager.checkRole(value.accessToken, 'ADMIN')
      if (!isAdmin)
        throw this.errorHandler.createAccessDenie()
      
      const wallet = await this.walletManager.increaseWallet(value)
      res.json(wallet)
    } catch (error) {
      this.errorHandler.handle(error, res)
    }
  }

  async decreaseBalance(req, res) {
    try {
      const { error, value } = validator.validateDecreaseWallet(req)
      if (error) throw error
      
      const isAdmin = await this.authManager.checkRole(value.accessToken, 'ADMIN')
      if (!isAdmin)
        throw this.errorHandler.createAccessDenie()
      
      const wallet = await this.walletManager.decreaseWallet(value)
      res.json(wallet)
    } catch (error) {
      this.errorHandler.handle(error, res)
    }
  }

  async getBalance(req, res) {
    try {
      const { error, value } = validator.validateGetBalance(req)
      if(error) throw error

      const user = await this.authManager.getUserByAccessToken(value)
      const wallets = await this.walletManager.getBalance({
        userId: user.id
      })
      res.json(wallets)
    } catch (error) {
      this.errorHandler.handle(error, res)
    }
  }

  async getBalanceByAdmin(req, res) {
    try {
      const { error, value } = validator.validateGetBalanceByAdmin(req)
      if(error) throw error

      const isAdmin = await this.authManager.checkRole(value.accessToken, 'ADMIN')
      if(!isAdmin) 
        throw this.errorHandler.createAccessDenie()
      const wallets = await this.walletManager.getBalance(value)
      res.json(wallets)
    } catch (error) {
      this.errorHandler.handle(error, res)
    }
  }

  async getCurrencies(req, res) {
    try {
      const { error, value } = validator.validateGetAllCurrencies(req)
      if(error) throw error

      const currencies = await this.currencyManager.getAllCurrencies()
      res.json(currencies)
    } catch (error) {
      this.errorHandler.handle(error)
    }
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
      console.log('currency', currency)
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
      this.errorHandler.handle(error, res)
    }
  }

  async getExchangeRate(req, res) {
    try {
      const { error, value } = validator.validateGetExchangeRate(req)
      if(error) throw error
      
      const exchangeRate = await this.exchangeRateManager.getExchangeRate(value)
      res.json(exchangeRate)
      
    } catch (error) {
      this.errorHandler.handle(error, res)
    }
  }

  async transfer(req, res) {
    try {
      const { error, value } = validator.validateTransfer(req)
      if(error) throw error

      const sender = await this.authManager.getUserByAccessToken({accessToken:value.accessToken})
      if(sender.role == 'ADMIN')
        throw this.errorHandler.createAccessDenie()
      value.senderId = sender.id
      const transaction = await this.transactionManager.transfer(value)
      res.json(transaction)
    } catch (error) {
      this.errorHandler.handle(error, res)      
    }
  }
}

CoreController.instance = CoreController.instance || new CoreController()

module.exports = CoreController