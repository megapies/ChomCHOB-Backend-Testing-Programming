module.exports = (sequelize, DataType) => {
  const ExchangeRate = sequelize.define('ExchangeRate', {
    from: {
      primaryKey: true,
      type: DataType.INTEGER,
      allowNull: false,
    },
    to: {
      primaryKey: true,
      type: DataType.INTEGER,
      allowNull: false,
    },
    rate: {
      type: DataType.DOUBLE,
      allowNull: false,
    }
  })

  ExchangeRate.associate = function(models) {
    models.ExchangeRate.belongsTo(models.Currency, {foreignKey: 'from'})
    models.ExchangeRate.belongsTo(models.Currency, {foreignKey: 'to'})
  }

  return ExchangeRate
}