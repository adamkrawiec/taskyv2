const User = require("#app/users/user.model");
const TaskRepository = require('../task.repository');
const Task = require('../task.model');
const taskDTO = require('../task.dto');
const asyncHandler = require('express-async-handler')

const index = asyncHandler(async (req, res, next) => {
  const query = { ...req.query, user_id: req.params.userId };
  let tasks = await TaskRepository.findTasks({ query }, { includes: [Task.User, Task.Item] });

  tasks = tasks.map((task) => taskDTO(task, req.currentUser));
  const title = req.t('tasks.user.title', { userName: tasks[0].user.fullName });

  res.json({ title, data: tasks });
});

module.exports = {
  index,
}
