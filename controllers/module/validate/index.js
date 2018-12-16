const auth = require('./validators/auth')
const currency = require('./validators/currency')
const exchangeRate = require('./validators/exchangeRate')
const wallet = require('./validators/wallet')

module.exports = {
  ...auth,
  ...currency,
  ...exchangeRate,
  ...wallet,
}