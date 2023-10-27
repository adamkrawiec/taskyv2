const Item = require('#app/items/item.model');
const TaskDTO = require('#app/tasks/task.dto');

const User = require('#app/users/user.model');

const { getItemTasksSummary } = require('./item-task-summary');

const getTasks = async(req, res) => {
  const item = await Item.findByPk(req.params.id);
  const tasks = await item.getTasks({ include: User });

  const tasksData = tasks.map((task) => TaskDTO(task));

  res.json({ tasks: tasksData });
};

const getTaskSummary = async(req, res) => {
  const itemId = req.params.id;
  const summary = await getItemTasksSummary(itemId);
  res.json({ summary });
};

module.exports = {
  getTasks,
  getTaskSummary
};
