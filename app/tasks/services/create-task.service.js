const User = require('#app/users/user.model');
const Task = require('../task.model');
const TaskMailerQueue = require('../task.mailer.queue');

const createTask = async({ userId, itemId, deadlineAt }) => {
  const taskParams = {
    userId,
    itemId,
    deadlineAt
  };

  const task = await Task.create(taskParams);
  const user = await User.findByPk(userId);

  await TaskMailerQueue.add('task-mailer', { task, user });
  return task;
};

module.exports = {
  createTask
};
