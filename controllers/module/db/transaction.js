module.exports = (models, sequelize) => {
  return {
    transfer: async ({
      refNum,
      senderId,
      receiverId,
      originCurrency,
      newCurrency,
      sendAmount,
      receiveAmount,
      exchangeRate
    }) => {
      const result = await sequelize.transaction(async (t) => {
        const senderWallet = await models.Wallet.findOne({
          where: {
            user_id: senderId,
            currency_id: originCurrency
          }
        })
        senderWallet.balance -= sendAmount
        await senderWallet.save()

        const receiverWallet = await models.Wallet.findOne({
          where: {
            user_id: receiverId,
            currency_id: newCurrency
          }
        })
        receiverWallet.balance += receiveAmount
        await receiverWallet.save()

        const transaction = await models.Transaction.create({
          refNum,
          sender: senderId,
          receiver: receiverId,
          origin_currency: originCurrency,
          new_currency: newCurrency,
          exhangeRate: exchangeRate,  // ! TODO ex[c]hange rate !!
          amount: sendAmount
        })

        return transaction
      })

      return result
    },
    createTransaction: async ({
      refNum,
      sender,
      receiver,
      originCurrency,
      newCurrency,
      exchangeRate,
      amount
    }) => {
      const transaction = models.Transaction.build({
        refNum,
        sender,
        receiver,
        origin_currency: originCurrency,
        new_currency: newCurrency,
        exchangeRate,
        amount
      })
      await transaction.save()
      return transaction
    }
  }
}