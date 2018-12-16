const Joi = require('joi')

module.exports = {
  validateIncreaseWallet: (req) => {
    const params = {
      accessToken: req.get('access-token'),
      userId: req.body.user_id,
      currencyId: req.body.currency_id,
      amount: req.body.amount
    }
    const schema = {
      accessToken: Joi.string().required(),
      userId: Joi.number().integer().required(),
      currencyId: Joi.number().integer().required(),
      amount: Joi.number().required(),
    }

    return Joi.validate(params, schema)
  },
  validateDecreaseWallet: (req) => {
    const params = {
      accessToken: req.get('access-token'),
      userId: req.body.user_id,
      currencyId: req.body.currency_id,
      amount: req.body.amount
    }
    const schema = {
      accessToken: Joi.string().required(),
      userId: Joi.number().integer().required(),
      currencyId: Joi.number().integer().required(),
      amount: Joi.number().required(),
    }

    return Joi.validate(params, schema)
  }
}