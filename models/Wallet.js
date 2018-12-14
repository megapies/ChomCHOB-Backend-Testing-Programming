module.exports = (sequelize, DataType) => {
  const Wallet = sequelize.define('Wallet', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    balance: {
      type: DataType.DOUBLE
    }
  })
  Wallet.associate = function(models) {
    models.Wallet.belongsTo(models.User)
  }
  return Wallet
}