const { userPath } = require('./users.paths');
const { userTasksPath } = require('#app/tasks/tasks.paths');

const appendNameWithMe = (user, currentUser) => {
  if(!currentUser) return user.fullName;

  return currentUser.id === user.id ? `${user.fullName} (me)` : user.fullName;
};
const userDTO = (user, currentUser) => {
  return {
    id: user.id,
    fullName: appendNameWithMe(user, currentUser),
    email: user.email,
    createdAt: user.createdAt,
    type: user.type,


    _links: {
      self: userPath(user),
    }
  };
};

const fullUserDTO = (user, currentUser) => {
  return {
    ...userDTO(user, currentUser),
    invitedAt: user.invitedAt,
    acceptedAt: user.acceptedAt,

    _links: {
      self: userPath(user),
      tasks: userTasksPath(user),
    }
  };
};

module.exports = {
  userDTO,
  fullUserDTO
};
