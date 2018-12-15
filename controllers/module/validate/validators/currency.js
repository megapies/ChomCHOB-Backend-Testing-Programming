const Joi = require('joi')

module.exports = {
  validateCreateCurrency: (req) => {
    const params = {
      accessToken: req.get('access-token'),
      currencyName: req.body.currency_name,
    }
    const schema = {
      accessToken: Joi.string().required(),
      currencyName: Joi.string().required(),
    }

    return Joi.validate(params, schema)
  },
  validateGetAllCurrency: (req) => {
    const params = {
      accessToken: req.get('access-token')
    }
    const schema = {
      accessToken: Joi.string().required()
    }

    return Joi.validate(params, schema)
  }
}