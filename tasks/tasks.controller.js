const Task = require("./task.model");
const User = require("../users/user.model");
const TaskMailer = require("./task.mailer");

const index = async (req, res) => {
  let tasks = await Task.findAll( { include: User });
  tasks = tasks.map((task) => taskDTO(task));

  const title = req.t('tasks.index.title')
  res.json({ title, data: tasks });
};

const showById = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  const taskdto = taskDTO(task);

  res.json({ data: task });
};

const showByUserId = async (req, res) => {
  const user = await User.findByPk(req.params.userId);

  let tasks = await user.getTasks({ include: User });
  tasks = tasks.map((task) => taskDTO(task));

  res.json({ data: tasks });
};

const create = async (req, res) => {
  const deadlineAt = req.body.deadline && new Date(req.body.deadline);
  const user = await User.findByPk(req.body.user_id);

  const taskParams = {
    userId: req.body.user_id,
    title: req.body.title,
    body: req.body.body,
    deadlineAt: req.body.deadline,
  }

  try {
    const task = await Task.create(taskParams);
    await TaskMailer.emailCreated(task, user);
    res.json(task);
  } catch(errors) {
    res.status(422).json({ errors })
  }
};

module.exports = {
  create,
  index,
  showById,
}
