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
    }
  })

  Currency.associate = function(models) {
    models.Currency.hasMany(models.Wallet)
    models.Currency.hasMany(models.ExchangeRate, {as: 'from'})
    models.Currency.hasMany(models.ExchangeRate, {as: 'to'})
    models.Currency.hasMany(models.Transaction, {as: 'origin_currency'})
    models.Currency.hasMany(models.Transaction, {as: 'new_currency'})
  }
  return Currency
}