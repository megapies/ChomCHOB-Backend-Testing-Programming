class CoreController {
  constructor() {
    console.log('core controller')
  }

  async login(req, res) {
    console.log('controller login')
    res.end('hi')
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