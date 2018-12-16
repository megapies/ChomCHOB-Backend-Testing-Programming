const uuidv4 = require('uuid/v4')
class TransactionManager {
  constructor(dbConnector, errorHandler) {
    this.dbConnector = dbConnector
    this.errorHandler = errorHandler
  }

  async transfer({
    senderId,
    receiverPublicId,
    originCurrencyId,
    newCurrencyId,
    amount,
  }) {
    const receiver = await this.dbConnector.getUserByPublicId({
      publicId: receiverPublicId
    })
    const senderWallet = await this.dbConnector.getWalletByUserId({
      userId: senderId,
      currencyId: originCurrencyId
    })
    // ! TODO: check balance
    const exchangeRate = await this.dbConnector.getExchangeRate({
      from: originCurrencyId,
      to: newCurrencyId
    })
    const receiveAmount = amount * exchangeRate.rate
    const refNum = uuidv4()
    const transaction = await this.dbConnector.transfer({
      refNum,
      senderId,
      receiverId: receiver.id,
      originCurrency: originCurrencyId,
      newCurrency: newCurrencyId,
      sendAmount: amount,
      receiveAmount,
      exchangeRate: exchangeRate.rate
    })
    return transaction
  }
}

module.exports = TransactionManager