const { userDTO } = require('#app/users/user.dto');
const itemDTO = require('#app/items/item.dto');

const taskDTO = (task, currentUser) => {
  return {
    id: task.id,
    createdAt: task.createdAt,
    completedAt: task.completedAt,
    deadlineAt: task.deadlineAt,
    overdue: task.deadlineAt < Date.now() && !task.completedAt,

    user: task.user && userDTO(task.user, currentUser),
    item: task.item && itemDTO(task.item, currentUser),

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
