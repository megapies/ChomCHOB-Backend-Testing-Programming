const CoreController = require('controllers')
const ctrl = CoreController.instance

module.exports = [
  {
    method: 'POST',
    path: '/login',
    controller: ctrl.login.bind(ctrl)
  },
  {
    method: 'POST',
    path: '/register',
    controller: ctrl.register.bind(ctrl)
  }
]