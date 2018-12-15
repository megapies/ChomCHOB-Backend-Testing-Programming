module.exports = (models) => {
  return {
    getWalletsByUserId: async ({
      userId
    }) => {
      const wallets = await models.Wallet.findAll({
        where: {
          userId: userId
        }
      })
      return wallets
    },
    createWallet: async ({
      userId,
      currencyId,
    }) => {
      console.log('create wallet', userId, currencyId)
      const wallet = models.Wallet.build({
        user_id: userId,
        currency_id: currencyId,
        balance: 0
      })
      console.log(wallet)
      await wallet.save()
      return wallet
    }
  }
}