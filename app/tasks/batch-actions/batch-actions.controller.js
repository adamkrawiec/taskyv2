const Task = require("../task.model");
const { createTasksQueue } = require("./batch-create.queue");

const batchAssign = async (req, res) => {
  const userIds = req.body.user_ids;
  const itemId = req.body.item_id;
  const deadlineAt = req.body.deadline;

  await createTasksQueue.add({ userIds, itemId, deadlineAt, currentUser })
  res.status(204).send("ok");
}

const batchUpdate = async (req, res) => {

}
const batchDelete = async (req, res) => {

}

module.exports = {
  batchAssign,
  batchUpdate,
  batchDelete
}
