const { createTasksQueue } = require('./batch-create.queue');

const batchAssign = async (req, res) => {
  const userIds = req.body.user_ids;
  const itemId = req.body.item_id;
  const deadlineAt = req.body.deadline;
  const { currentUser } = req;

  await createTasksQueue.add({ userIds, itemId, deadlineAt, currentUser });
  res.status(204).send('ok');
};

module.exports = {
  batchAssign,
};
