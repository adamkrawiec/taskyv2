const Task = require('./task.model');
// const TaskMailerQueue = require('./task.mailer.queue');

const completeTask = async(taskId) => {
  const task = await Task.findByPk(taskId);
  await task.update({completedAt: Date.now() });
};

module.exports = {
  completeTask
};
