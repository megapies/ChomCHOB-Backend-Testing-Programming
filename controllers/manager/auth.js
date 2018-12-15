const bcrypt = require('bcrypt-nodejs')
const Hashids = require('hashids')
const asyncRedis = require('async-redis')
const client = asyncRedis.createClient();
const uuidv4 = require('uuid/v4')
client.on('error', function(error) {
  console.log('redis error', error)
})

class AuthManager {
  constructor(dbConnector, errorHandler) {
    this.dbConnector = dbConnector
    this.errorHandler = errorHandler
    this.hashIds = new Hashids('SaAe', 6)
  }

  async checkRole(accessToken, target='ADMIN') {
    const userId = await client.get(accessToken)
    const user = await this.dbConnector.getUserById({userId})
    return user.role == target
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
    if(!user) {
      throw this.errorHandler.createDataNotFound()
    }
    if(bcrypt.compareSync(password, user.password)) {
      const accessToken = uuidv4()
      await client.set(accessToken, `${user.id}`)

      user.password = undefined
      user.id = undefined
      return {
        user,
        accessToken
      }
    }
    throw this.errorHandler.createWrongData()
  }
}

module.exports = AuthManager