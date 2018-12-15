module.exports = (models) => {
  return {
    createExchangeRate: async ({
      from,
      to,
      rate,
    }) => {
      const exchangeRate = models.ExchangeRate.build({
        from,
        to,
        rate,
      })
      await exchangeRate.save()
      return exchangeRate
    },
    getExhangeRatesByFrom: async ({
      from
    }) => {
      const exchangeRates = await models.ExchangeRate.findAll({
        where: {
          from
        }
      })
      return exchangeRates
    },
    getExhangeRatesByTo: async({
      to
    }) => {
      const exchangeRates = await models.ExchangeRate.findAll({
        where: {
          to
        }
      })
      return exchangeRates
    },
    getExchangeRate: async({
      from,
      to,
    }) => {
      const exhangeRate = await models.ExchangeRate.findOne({
        where: {
          from,
          to
        }
      })
      return exhangeRate
    },
    modifyExchangeRate: async({
      from,
      to,
      rate,
    }) => {
      const exhangeRate = await models.ExchangeRate.findOne({
        where: {
          from,
          to
        }
      })
      exhangeRate.rate = rate
      await exhangeRate.save()
      return exhangeRate
    }
  }
}