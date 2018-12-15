class CurrencyManager {
  constructor(dbConnector, errorHandler) {
    this.dbConnector = dbConnector
    this.errorHandler = errorHandler
  }

  async createCurrency({
    currencyName
  }) {
    const currency = await this.dbConnector.createCurrency({
      currencyName
    })
    const userIds = await this.dbConnector.getAllUserIds()
    for(let i in userIds) {
      const userId = userIds[i]
      await this.dbConnector.createWallet({
        userId: userId.id,
        currencyId: currency.id,
      })
    }

    const currencyIds = await this.dbConnector.getAllCurrencyIds()
    for(let i in currencyIds) {
      const id = currencyIds[i].id
      await this.dbConnector.createExchangeRate({
        from: currency.id,
        to: id,
        rate: 1.0
      })

      if(id == currency.id) return
      await this.dbConnector.createExchangeRate({
        from:id,
        to: currency.id,
        rate: 1.0
      })
    }

    return currency
  }
  
}

module.exports = CurrencyManager