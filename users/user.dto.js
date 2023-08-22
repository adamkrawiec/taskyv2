const userDTO = (user) => {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,

    _links: {
      self: `/users/${user.id}`
    }
  }
}

module.exports = {
  userDTO,
}
