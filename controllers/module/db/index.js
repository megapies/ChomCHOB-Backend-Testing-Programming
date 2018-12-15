module.exports = (models) => {
  const auth = require('./auth')(models)

  return {
    ...auth
  }
}