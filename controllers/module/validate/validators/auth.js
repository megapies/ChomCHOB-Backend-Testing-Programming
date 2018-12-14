const Joi = require('joi')

module.exports = {
  validateLogin: (req) => {
    const params = {
      username: req.body.username,
      password: req.body.password,
    }
    const schema = {
      username: Joi.string().required(),
      password: Joi.string().required(),
    }

    return Joi.validate(params, schema)
  }
}