module.exports = (models) => {
  return {
    getWalletsByUserId: async ({
      userId
    }) => {
      const wallets = await models.Wallet.findAll({
        where: {
          user_id: userId
        },
        include: [
          {
            model: models.Currency
          }
        ]
      })
      return wallets
    },
    createWallet: async ({
      userId,
      currencyId,
    }) => {
      const wallet = models.Wallet.build({
        user_id: userId,
        currency_id: currencyId,
        balance: 0
      })
      await wallet.save()
      return wallet
    },
    increaseWallet: async ({
      walletId,
      amount,
    }) => {
      const wallet = await models.Wallet.findOne({
        where: {
          id: walletId
        }
      })
      wallet.balance += amount
      await wallet.save()
    },
    decreaseWallet: async ({
      walletId,
      amount
    }) => {
      const wallet = await models.Wallet.findOne({
        where: {
          id: walletId
        }
      })
      wallet.balance -= amount
      await wallet.save()
    },
    increaseWalletByUserId: async ({
      userId,
      currencyId,
      amount,
    }) => {
      const wallet = await models.Wallet.findOne({
        where: {
          currency_id: currencyId,
        },
        include: [
          {
            model: models.User,
            where: {
              id: userId
            }
          }
        ]
      })
      wallet.balance += amount
      await wallet.save()
      return wallet
    },
    decreaseWalletByUserId: async ({
      userId,
      currencyId,
      amount,
    }) => {
      const wallet = await models.Wallet.findOne({
        where: {
          currency_id: currencyId,
        },
        include: [
          {
            model: models.User,
            where: {
              id: userId
            }
          }
        ]
      })
      wallet.balance -= amount
      await wallet.save()
      return wallet
    }
  }
}