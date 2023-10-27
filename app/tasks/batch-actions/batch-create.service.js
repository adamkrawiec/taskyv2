const User = require('#app/users/user.model');
const Task = require('../task.model');
const { TaskMailerQueue } = require('../task.mailer.queue');

const batchCreateTasks = async ({ userIds, itemId, deadlineAt, currentUser }) => {
  User.findAll({ where: { id: userIds }}).then((users) => {
    users.map(async (user) => {
      let task = await Task.create({
        userId: user.id,
        itemId,
        deadlineAt
      });
      await TaskMailerQueue.add({ task, user });
    });
  });

  // A placeholder, please replace with proper mailer
  await TaskMailerQueue.add({ currentUser });
};

module.exports = batchCreateTasks;
