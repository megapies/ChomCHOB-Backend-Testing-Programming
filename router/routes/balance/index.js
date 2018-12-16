const CoreController = require('controllers')
const ctrl = CoreController.instance
module.exports = [
  {
    method: 'PUT',
    path: '/increase',
    controller: ctrl.increaseBalance.bind(ctrl)
  },
  {
    method: 'PUT',
    path: '/decrease',
    controller: ctrl.decreaseBalance.bind(ctrl)
  },
  {
    method: 'GET',
    path: '/',
    controller: ctrl.getBalance.bind(ctrl)
  },
  {
    method: 'GET',
    path: '/user/:user_id',
    controller: ctrl.getBalanceByAdmin.bind(ctrl)
  }
]