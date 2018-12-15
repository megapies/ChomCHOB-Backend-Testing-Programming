module.exports = (models) => {
  return {
    createCurrency: async ({
      currencyName
    }) => {
      const currency = models.Currency.build({
        name: currencyName,
      })
      await currency.save()
      return currency
    },
    getAllCurrencyIds: async () => {
      const currencyIds = await models.Currency.findAll({
        attributes: ['id']
      })
      return currencyIds
    },
  }
}