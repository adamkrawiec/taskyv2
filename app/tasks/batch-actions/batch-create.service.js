const User = require('#app/users/user.model');
const BatchCreateMailer = require('./mailers/batch-create-mailer.queue');
const { createTask } = require('../services/create-task.service');

const batchCreateTasks = async ({ userIds, itemId, deadlineAt, currentUser }) => {
  let users = await User.findAll({ where: { id: userIds }});

  let tasks = await users.map(async (user) =>
    await createTask({ userId: user.id, itemId, deadlineAt }));

  await BatchCreateMailer.add('task-batch-create-mailer', { currentUser, tasks });
};

module.exports = batchCreateTasks;
