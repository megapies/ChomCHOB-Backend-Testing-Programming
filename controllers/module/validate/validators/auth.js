const Joi = require('joi')

module.exports = {
  validateRegister: (req) => {
    const params = {
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.first_name,
      lastName: req.body.last_name
    }

    const schema = {
      username: Joi.string().required(),
      password: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    }

    return Joi.validate(params, schema)
  },
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