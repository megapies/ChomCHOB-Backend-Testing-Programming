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

  async getBalance({
    userId
  }) {
    const wallets = await this.dbConnector.getWalletsByUserId({ userId })
    const result = []
    for(let i in wallets) {
      const wallet = wallets[i]
      result.push({
        currency: {
          id: wallet.Currency.id,
          name: wallet.Currency.name,
        },
        balance: wallet.balance
      })
    }
    return result
  }
}

module.exports = WalletManager