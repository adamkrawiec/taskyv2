const { userDTO } = require("#users/user.dto");
const itemDTO = require("#items/item.dto");

const taskDTO = (task) => {
  return {
    id: task.id,
    title: task.title,
    status: task.status,
    createdAt: task.createdAt,
    completedAt: task.completedAt,
    deadlineAt: task.deadlineAt,

    user: task.user && userDTO(task.user),
    item: task.item && itemDTO(task.item),

    _links: {
      self: `/tasks/${task.id}`,
      userTasks: `/tasks/user/${task.userId}`,
      complete: `/tasks/${task.id}/complete`,
      update: `/tasks/${task.id}`,
      destroy: `/tasks/${task.id}`
    }
  }
}

module.exports = taskDTO;
