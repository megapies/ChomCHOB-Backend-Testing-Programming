const auth = require('./validators/auth')
const currency = require('./validators/currency')

module.exports = {
  ...auth,
  ...currency,
}