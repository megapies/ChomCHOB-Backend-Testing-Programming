const CoreController = require('controllers')
const ctrl = CoreController.instance
module.exports = [
  {
    method: 'PUT',
    path: '/increase',
    controller: ctrl.increaseBalance
  },
  {
    method: 'PUT',
    path: '/decrease',
    controller: ctrl.decreaseBalance
  },
  {
    method: 'GET',
    path: '/',
    controller: ctrl.getBalance
  },
]