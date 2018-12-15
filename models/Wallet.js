module.exports = (sequelize, DataType) => {
  const Wallet = sequelize.define('Wallet', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    currency_id: {
      type: DataType.INTEGER,
      allowNull: false
    },
    balance: {
      type: DataType.DOUBLE
    }
  })
  Wallet.associate = function(models) {
    models.Wallet.belongsTo(models.User, { foreignKey: 'user_id' })
    models.Wallet.belongsTo(models.Currency, { foreignKey: 'currency_id' })
  }
  return Wallet
}