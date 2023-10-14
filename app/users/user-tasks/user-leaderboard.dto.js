const { userDTO } = require("#app/users/user.dto");

module.exports = (user) => {
  return {
    ...userDTO(user),
    completed_tasks_count: user.dataValues.completed_tasks_count
  }
}
