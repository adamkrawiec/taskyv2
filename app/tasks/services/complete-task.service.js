const Task = require('../task.model');

const completeTask = async(taskId) => {
  const task = await Task.findByPk(taskId);
  return await task.update({completedAt: Date.now() });
};

module.exports = {
  completeTask
};
