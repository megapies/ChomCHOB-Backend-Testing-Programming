module.exports = (sequelize, DataType) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    refNum: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
    },
    exhangeRate: {
      type: DataType.DOUBLE,
    },
    amount: {
      type: DataType.DOUBLE,
      allowNull: false,
    },
  })

  Transaction.associate = function(models) {
    models.Transaction.belongsTo(models.User, {as: 'sender'})
    models.Transaction.belongsTo(models.User, {as: 'receiver'})
    models.Transaction.belongsTo(models.Currency, {as: 'origin_currency'})
    models.Transaction.belongsTo(models.Currency, {as: 'new_currency'})
  }

  return Transaction
}