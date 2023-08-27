const { userDTO } = require("../users/user.dto");

const taskDTO = (task) => {
  return {
    id: task.id,
    title: task.title,
    deadline: task.deadline,
    status: task.status,
    completedAt: task.completedAt,

    user: userDTO(task.user),

    _links: {
      self: `/tasks/${task.id}`,
      userTasks: `/tasks/user/${task.userId}`
    }
  }
}

module.exports = taskDTO;