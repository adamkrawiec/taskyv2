const { userDTO } = require('#app/users/user.dto');
const itemDTO = require('#app/items/item.dto');

const taskDTO = (task) => {
  return {
    id: task.id,
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
  };
};

module.exports = taskDTO;
