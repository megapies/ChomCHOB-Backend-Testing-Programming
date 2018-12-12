const Sequelize = require('sequelize')

class ModelLoader {
  constructor(dbName='cc_backend_test_programming',
              username='root',
              password='',
              host='localhost',
              )
  {
    this.sequelize = new Sequelize(dbName, username, password, {
      host: host,
      dialect: 'mysql',
      operatorsAliases: false,
      pool: {
        max: 5,
        acquire: 30000,
        idle: 10000
      }
    })
    this.modelNames = ['User']
  }

  async connect() {
    try {
      const res = await this.sequelize.authenticate()
      console.log('Connect DB success')
      return true
    } catch (e) {
      console.log('Connect DB fail', e)
      return false
    }
  }

  async load() {
    const models = {}
    for(let i in this.modelNames) {
      const model = require(`./${this.modelNames[i]}`)(this.sequelize)
      try {
        await model.sync({force: false})
        models[this.modelNames[i]] = model  
      } catch (e) {
        console.log(`Sync model ${this.modelNames[i]} fail`, e);
      }
    }
    return models
  }
}

module.exports = ModelLoader
