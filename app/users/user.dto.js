const userDTO = (user) => {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    invitedAt: user.invitedAt,
    acceptedAt: user.acceptedAt,

    _links: {
      self: `/users/${user.id}`,
    }
  }
}

const fullUserDTO = (user) => {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,

    _links: {
      self: `/users/${user.id}`,
      myTasks: `/tasks/user/${user.id}`,
    }
  }
}

module.exports = {
  userDTO,
  fullUserDTO
}
