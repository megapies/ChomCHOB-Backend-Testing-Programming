const Joi = require('joi')

module.exports = {
  validateModifyExchangeRate: (req) => {
    const params = {
      accessToken: req.get('accessToken'),
      from: req.params.from_id,
      to: req.params.to_id,
      rate: req.body.rate,
    }
    const schema = {
      accessToken: Joi.string().required(),
      from: Joi.number().integer().required(),
      to: Joi.number().integer().required(),
      rate: Joi.number().required()
    }

    return Joi.validate(params, schema)
  },
  validateGetExchangeRate: (req) => {
    const params = {
      accessToken: req.get('access-token'),
      from: req.params.from_id,
      to: req.params.to_id
    }
    const schema = {
      accessToken: Joi.string().required(),
      from: Joi.number().integer().required(),
      to: Joi.number().integer().required(),
    }
    return Joi.validate(params, schema)
  }
}