const TaskDTO = require('#app/tasks/task.dto');

const User = require('#app/users/user.model');

const { getItemTasksSummary } = require('./item-task-summary');

const getTasks = async(req, res) => {
  const tasks = await req.item.getTasks({ include: User });

  const tasksData = tasks.map((task) => TaskDTO(task));

  res.json({ tasks: tasksData });
};

const getTaskSummary = async(req, res) => {
  const summary = await getItemTasksSummary(req.item.id);
  res.json({ summary });
};

module.exports = {
  getTasks,
  getTaskSummary
};
