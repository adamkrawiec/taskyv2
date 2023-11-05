const User = require('#app/users/user.model');
const ConfirmMailerQueue = require('./mailers/confirm-mailer.queue');
const { createTask } = require('../services/create-task.service');

const batchCreateTasks = async ({ userIds, itemId, deadlineAt, currentUser }) => {
  let users = await User.findAll({ where: { id: userIds }});

  let tasks = await users.map(async (user) =>
    await createTask({ userId: user.id, itemId, deadlineAt }));
  await ConfirmMailerQueue.add({ user: currentUser });
};
