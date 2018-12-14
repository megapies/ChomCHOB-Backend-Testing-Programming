module.exports = (sequelize, DataType) => {
  const ExchangeRate = sequelize.define('ExchangeRate', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rate: {
      type: DataType.DOUBLE,
      allowNull: false,
    }
  })

  ExchangeRate.associate = function(models) {
    models.ExchangeRate.belongsTo(models.Currency, {as: 'from'})
    models.ExchangeRate.belongsTo(models.Currency, {as: 'to'})
  }

  return ExchangeRate
}