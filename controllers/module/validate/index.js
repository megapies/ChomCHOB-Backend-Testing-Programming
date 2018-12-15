const auth = require('./validators/auth')
const currency = require('./validators/currency')
const exchangeRate = require('./validators/exchangeRate')

module.exports = {
  ...auth,
  ...currency,
  ...exchangeRate,
}