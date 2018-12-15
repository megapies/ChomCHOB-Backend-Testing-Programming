class ExchangeRateManager {
  constructor(dbConnector, errorHandler) {
    this.dbConnector = dbConnector
    this.errorHandler = errorHandler
  }

  async modifyExchangeRate({
    from,
    to,
    rate,
  }) {
    const exchangeRate = await this.dbConnector.modifyExchangeRate({
      from,
      to,
      rate
    })

    return exchangeRate
  }
}

module.exports = ExchangeRateManager