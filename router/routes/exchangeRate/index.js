const CoreController = require('controllers')
const ctrl = CoreController.instance

module.exports = [
  {
    method: 'PUT',
    path: '/:from_id/:to_id',
    controller: ctrl.changeExchangeRate,
  },
  {
    method: 'GET',
    path: '/:from_id/:to_id',
    controller: ctrl.getExchangeRate,
  }
]