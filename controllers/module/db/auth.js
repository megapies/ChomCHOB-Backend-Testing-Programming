function init(models) {
  return {
    getUserByUsername: async ({username}) => {
      return models.User.findOne({
        where: {
          username
        }
      }) 
    },
    getUserByPublicId: async ({publicId}) => {

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