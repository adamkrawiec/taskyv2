const { userDTO } = require('#app/users/user.dto');

module.exports = (user, currentUser) => {
  return {
    ...userDTO(user, currentUser),
    completed_tasks_count: user.dataValues.completed_tasks_count
  };
};
