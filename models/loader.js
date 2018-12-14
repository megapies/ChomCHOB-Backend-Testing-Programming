const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')

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
      logging: false,
      pool: {
        max: 5,
        acquire: 30000,
        idle: 10000
      }
    })
    this.modelNames = []
    fs.readdirSync('models').forEach((file) => {
      if(file.indexOf('.js') > 0 && file != 'loader.js') 
        this.modelNames.push(file)
    })
    
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
      const model = this.sequelize.import(`./${this.modelNames[i]}`)
      models[model.name] = model
    }

    for(let m in models) {
      models[m].associate(models)
    }

    for(let m in models) {
      const model = models[m]
      try {
        await model.sync({force: false})
      } catch (e) {
        console.log(`Sync model ${m} fail`, e);
      }
    }
    
    return models
  }
}

module.exports = ModelLoader
