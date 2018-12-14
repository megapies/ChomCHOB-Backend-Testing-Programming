const CoreController = require('controllers')
const ctrl = CoreController.instance

module.exports = [
  {
    method: 'GET',
    path: '/',
    controller: ctrl.getCurrencies
  },
  {
    method: 'POST',
    path: '/',
    controller: ctrl.createCurrency
  },
]