const { Op } = require("sequelize");

const Task = require("./task.model");
const User = require("#app/users/user.model");
const Item = require("#app/items/item.model");
const taskDTO = require("./task.dto");
const { TaskMailerQueue } = require("./task.mailer.queue");
const TaskRepository = require("./task.repository");

const index = async (req, res) => {
  let tasks = await TaskRepository.findTasks(req);
  tasks = tasks.map((task) => taskDTO(task));

  const title = req.t('tasks.index.title')
  res.json({ title, data: tasks });
};

const showById = async (req, res) => {
  const task = await Task.findByPk(req.params.id, { include: [User, Item] });
  const taskdto = taskDTO(task);

  res.json({ data: taskdto });
};

const showByUserId = async (req, res) => {
  const user = await User.findByPk(req.params.userId);

  let tasks = await user.getTasks({ include: User });
  tasks = tasks.map((task) => taskDTO(task));
  const title = req.t('tasks.user.title', { userName: user.fullName });

  res.json({ title, data: tasks });
};

const myTasks = async(req, res) => {
  let tasks = await req.currentUser.getTasks({ include: User });
  tasks = tasks.map((task) => taskDTO(task));
  const title = req.t('tasks.my.title');

  res.json({ title, data: tasks });
}

const create = async (req, res) => {
  const user = await User.findByPk(req.body.user_id);

  const taskParams = {
    userId: req.body.user_id,
    title: req.body.title,
    body: req.body.body,
    deadlineAt: req.body.deadline,
  }

  try {
    const task = await Task.create(taskParams);
    await TaskMailerQueue.add({ task, user })
    res.json(task);
  } catch(errors) {
    res.status(422).json({ errors })
  }
};

const complete = async(req, res) => {
  const task = await Task.findByPk(req.params.id);
  await task.update({completedAt: Date.now() })
  res.status(204).send("ok");
}

const update = async(req, res) => {
  const task = await Task.findByPk(req.params.id);

  const taskParams = {
    title: req.body.title,
    body: req.body.body,
    deadlineAt: req.body.deadline,
  };

  try {
    await task.update(taskParams)
    res.status(204).send("ok");
  }
  catch(errors){
    res.status(422).json({ errors })
  }
}

const destroy = async(req, res) => {
  const task = await Task.findByPk(req.params.id);
  await user.destroy();
  res.status(204).send("ok");
}

const summary = async(req, res) => {
  const total = await Task.count();
  const completed = await Task.scope('completed').count();
  const overdue = await Task.scope('overdue').count()

  res.json({ total, completed, overdue });
}

module.exports = {
  create,
  index,
  showById,
  showByUserId,
  myTasks,
  complete,
  update,
  summary,
  update,
  destroy
}
