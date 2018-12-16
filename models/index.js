const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')

function init({
  dbName,
  username,
  password,
  host
} = {
  dbName:'cc_backend_test_programming',
  username:'root',
  password:'',
  host:'localhost',
}) {
  const sequelize = new Sequelize(dbName, username, password, {
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
  const modelNames = []
  const models = {}
  fs.readdirSync(__dirname).forEach((file) => {
    if(file.indexOf('.js') > 0 && file != 'index.js' && file != 'index.2.js') 
      modelNames.push(file)
  })
  
  modelNames.forEach((file) => {
    const model = sequelize.import(`./${file}`)
      models[model.name] = model
  })
  
  for(let m in models) {
    models[m].associate(models)
  }

  for(let m in models) {
    models[m].sync({force: false})
  }

  return {
    models,
    sequelize
  }
}

module.exports = init