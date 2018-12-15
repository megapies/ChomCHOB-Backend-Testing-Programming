const bcrypt = require('bcrypt-nodejs')
const Hashids = require('hashids')

class AuthManager {
  constructor(dbConnector, errorHandler) {
    this.dbConnector = dbConnector
    this.errorHandler = errorHandler
    this.hashIds = new Hashids('SaAe', 6)
  }

  async register({
    username,
    password,
    firstName,
    lastName,
  }) {
    const publicIdCreator = (userId) => {
      return this.hashIds.encode(userId)
    }
    const hashPassword = bcrypt.hashSync(password)
    const user = await this.dbConnector.registerUser({
      username,
      hashPassword,
      firstName,
      lastName,
    }, publicIdCreator)
    return user
  }

  async login({
    username,
    password
  }) {
    const user = await this.dbConnector.getUserByUsername({
      username
    })
    console.log(user)
    if(!user) {
      throw this.errorHandler.createDataNotFound()
    }
    if(bcrypt.compareSync(password, user.password)) {
      user.password = undefined
      user.id = undefined
      return user
    }
    throw this.errorHandler.createWrongData()
  }
}

module.exports = AuthManager