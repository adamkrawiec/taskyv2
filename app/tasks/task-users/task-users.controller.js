const TaskRepository = require('../task.repository');
const Task = require('../task.model');
const taskDTO = require('../task.dto');
const asyncHandler = require('express-async-handler');
const { getSummary } = require('../services/task-summary.service');

const index = asyncHandler(async (req, res) => {
  const query = { ...req.query, user_id: req.params.userId };
  let tasks = await TaskRepository.findTasks({ query }, { includes: [Task.User, Task.Item] });

  tasks = tasks.map((task) => taskDTO(task, req.currentUser));
  const title = req.t('tasks.user.title', { userName: tasks[0].user.fullName });

  res.json({ title, data: tasks });
});

const summary = async(req, res) => {
  const summary = await getSummary({ query: { ...req.query, user_id: req.params.userId } });
  res.json(summary);
};

module.exports = {
  index,
  summary
};
