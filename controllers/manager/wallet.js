class WalletManager {
  constructor(dbConnector, errorHandler) {
    this.dbConnector = dbConnector
    this.errorHandler = errorHandler
  }
  
  async increaseWallet({
    userId,
    currencyId,
    amount,
  }) {
    const wallet = await this.dbConnector.increaseWalletByUserId({
      userId,
      currencyId,
      amount,
    })
    return wallet
  }

  async decreaseWallet({
    userId,
    currencyId,
    amount,
  }) {
    const wallet = await this.dbConnector.decreaseWalletByUserId({
      userId,
      currencyId,
      amount,
    })
    return wallet
  }
}

module.exports = WalletManager