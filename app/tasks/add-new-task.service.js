const Task = require("./task.model");
const User = require("#app/users/user.model");
const { TaskMailerQueue } = require("./task.mailer.queue");

const addNewTask = async({ userId, itemId, deadlineAt }) => {
  const taskParams = {
    userId,
    itemId,
    deadlineAt
  };

  const task = await Task.create(taskParams);
  await TaskMailerQueue.add({ task, user });
  return task
}

module.exports = {
  addNewTask
}
