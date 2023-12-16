const User = require('#app/users/user.model');
const Task = require('../task.model');
const TaskSchema = require("../task.schema");
const TaskMailerQueue = require('../task.mailer.queue');

const createTask = async({ userId, itemId, deadline }) => {
  const { error, taskParams } = TaskSchema.validate(
    { userId, itemId, deadlineAt: deadline},
    { abortEarly: false }
  );

  if(typeof(error) === 'undefined') {
    const task = await Task.create(taskParams);
    const user = await User.findByPk(userId);
    await TaskMailerQueue.add('task-mailer', { task, user });
    return { task, error };
  } else {
    return { task: taskParams, error };
  }
};

module.exports = {
  createTask
};
