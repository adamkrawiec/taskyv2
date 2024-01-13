const { userDTO } = require('#app/users/user.dto');

const getItemSource = (url) => {
  if(!url) return 'unknown';

  return new URL(url).hostname.replace('www.', '').split('.')[0];
};

const simpleTaskDTO = (task) => {
  return {
    id: task.id,
    createdAt: task.createdAt,
    completedAt: task.completedAt,
    deadlineAt: task.deadlineAt,
    overdue: task.deadlineAt < new Date() && !task.completedAt,
    _links: {
      complete: `/tasks/${task.id}/complete`,
    }
  };
};

const itemDTO = (item, currentUser) => {
  return {
    id: item.id,
    title: item.title,
    body: item.body,
    url: item.url,
    source: getItemSource(item.url),
    createdAt: item.createdAt,

    author: item.user && userDTO(item.user, currentUser),

    task: item.task && simpleTaskDTO(item.task),

    _links: {
      self: `/items/${item.id}`,
      tasks: `/items/${item.id}/tasks`
    }
  };
};

module.exports = itemDTO;
