const CoreController = require('controllers')
const ctrl = CoreController.instance

module.exports = [
  {
    method: 'POST',
    path: '/',
    controller: ctrl.transfer.bind(ctrl)
  }
]