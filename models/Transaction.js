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
    sender: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    receiver: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    origin_currency: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    new_currency: {
      type: DataType.INTEGER,
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
    models.Transaction.belongsTo(models.User, {foreignKey : 'sender'})
    models.Transaction.belongsTo(models.User, {foreignKey: 'receiver'})
    models.Transaction.belongsTo(models.Currency, {foreignKey: 'origin_currency'})
    models.Transaction.belongsTo(models.Currency, {foreignKey: 'new_currency'})
  }

  return Transaction
}