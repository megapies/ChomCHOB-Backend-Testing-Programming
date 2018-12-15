module.exports = (sequelize, DataType) => {
  const Currency = sequelize.define('Currency', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    }
  })

  Currency.associate = function(models) {
    models.Currency.hasMany(models.Wallet, {foreignKey: 'currency_id'})
    models.Currency.hasMany(models.ExchangeRate, {as: 'from', foreignKey: 'from'})
    models.Currency.hasMany(models.ExchangeRate, {as: 'to', foreignKey: 'to'})
    models.Currency.hasMany(models.Transaction, {as: 'origin', foreignKey: 'origin_currency'})
    models.Currency.hasMany(models.Transaction, {as: 'new', foreignKey: 'new_currency'})
  }
  return Currency
}