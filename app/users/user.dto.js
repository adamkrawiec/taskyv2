const { userPath } = require('./users.paths');
const { userTasksPath } = require('#app/tasks/tasks.paths');

const userDTO = (user) => {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    createdAt: user.createdAt,


    _links: {
      self: userPath(user),
    }
  };
};

const fullUserDTO = (user) => {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    createdAt: user.createdAt,
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
