module.exports = (sequelize, DataType) => {
  const User = sequelize.define('User', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataType.STRING,
      allowNull: false,
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
    }
  })
  User.associate = function(models) {
    models.User.hasMany(models.Wallet)
    models.User.hasMany(models.Transaction, {as: 'sender'})
    models.User.hasMany(models.Transaction, {as: 'receiver'})
  }

  return User
}