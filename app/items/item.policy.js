const Task = require('#app/tasks/task.model');

const allowShow = async (user, item) => {
  if (user.type === 'admin') return true;

  return item.visibility === 'all' ||
    (item.visibility === 'selected' && await Task.findOne({ where: { userId: user.id, itemId: item.id }})) ||
    item.addedById === user.id;
};

const allowEdit = (user, item) => {
  if (user.type === 'admin') return true;

  return item.addedById === user.id;
};

const allowIndex = (user) => user;

module.exports = {
  allowShow,
  allowEdit,
  allowIndex
};