function init(models) {
  return {
    getUserByUsername: async ({username}) => {
      return models.User.findOne({
        where: {
          username
        }
      }) 
    },
    getUserById: async ({userId}) => {
      return models.User.findOne({
        where: {
          id: userId
        }
      })
    },
    getAllUserIds: async () => {
      return await models.User.findAll({
        attributes: ['id'],
        where: {
          role: 'USER'
        }
      })
    },
    getAllAdminIds: async () => {
      return await models.User.findAll({
        attributes: ['id'],
        where: {
          role: 'ADMIN'
        }
      })
    },
    getUserByPublicId: async ({publicId}) => {
      return await models.User.findOne({
        where: {
          publicId: publicId
        }
      })
    },
    registerUser: async ({
      username,
      hashPassword,
      firstName,
      lastName,
    }, publicIdCreator) => {
      const user = models.User.build({
        username,
        password: hashPassword,
        firstName,
        lastName
      })
      await user.save()
      const publicId = publicIdCreator(user.id)
      user.publicId = publicId
      console.log('register', user.id, publicId)
      await user.save()
      return user
    },
  }
}

module.exports = init