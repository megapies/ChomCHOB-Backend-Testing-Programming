module.exports = (sequelize, DataType) => {
  const User = sequelize.define('User', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataType.STRING,
      unique: true,
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataType.STRING
    },
    lastName: {
      type: DataType.STRING,
    },
    publicId: {
      type: DataType.STRING,
      unique: true
    },
    role: {
      type: DataType.ENUM('USER', 'ADMIN'),
      defaultValue: 'USER',
    }
  })
  User.associate = function(models) {
    models.User.hasMany(models.Wallet, { foreignKey: 'user_id' })
    models.User.hasMany(models.Transaction, { as:'sender', foreignKey: 'sender' })
    models.User.hasMany(models.Transaction, { as:'receiver', foreignKey: 'receiver'})
  }

  return User
}