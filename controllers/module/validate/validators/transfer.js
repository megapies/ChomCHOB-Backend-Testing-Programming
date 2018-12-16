const Joi = require('joi')

module.exports = {
  validateTransfer: (req) => {
    const params = {
      accessToken: req.get('access-token'),
      receiverPublicId: req.body.receiver_public_id,
      originCurrencyId: req.body.origin_currency_id,
      newCurrencyId: req.body.new_currency_id,
      amount: req.body.amount
    }
    const schema = {
      accessToken: Joi.string().required(),
      receiverPublicId: Joi.string().required(),
      originCurrencyId: Joi.number().integer().required(),
      newCurrencyId: Joi.number().integer().required(),
      amount: Joi.number().required(),
    }

    return Joi.validate(params, schema)
  }
}