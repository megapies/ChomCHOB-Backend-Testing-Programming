module.exports = (models) => {
  const auth = require('./auth')(models)
  const currency = require('./currency')(models)
  const wallet = require('./wallet')(models)
  const exhangeRate = require('./exchangeRate')(models)
  return {
    ...auth,
    ...currency,
    ...wallet,
    ...exhangeRate,
  }
}