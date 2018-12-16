module.exports = (models, sequelize) => {
  const auth = require('./auth')(models)
  const currency = require('./currency')(models)
  const wallet = require('./wallet')(models)
  const exhangeRate = require('./exchangeRate')(models)
  const transaction = require('./transaction')(models, sequelize)

  return {
    ...auth,
    ...currency,
    ...wallet,
    ...exhangeRate,
    ...transaction,
  }
}