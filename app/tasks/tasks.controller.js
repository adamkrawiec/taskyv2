const Task = require('./task.model');
const User = require('#app/users/user.model');
const Item = require('#app/items/item.model');
const taskDTO = require('./task.dto');
const TaskRepository = require('./task.repository');
const { createTask } = require('.services/create-task.service');
const { completeTask } = require('./services/complete-task.service');

const index = async (req, res) => {
  let tasks = await TaskRepository.findTasks(req);
  tasks = tasks.map((task) => taskDTO(task));

  const title = req.t('tasks.index.title');
  res.json({ title, data: tasks });
};

const showById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, { include: [User, Item] });
    const taskdto = taskDTO(task);

    res.json({ data: taskdto });
  }

  catch(error) {
    res.status(404).json({ error });
  }
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
};

const create = async (req, res) => {
  try {
    const task = await createTask(permitTaskParams(req));
    res.json(taskDTO(task));
  } catch(errors) {
    res.status(422).json({ errors });
  }
};

const complete = async(req, res) => {
  await completeTask(req.params.id);
  res.status(204).send('ok');
};

const update = async(req, res) => {
  const task = await Task.findByPk(req.params.id);

  try {
    await task.update(permitTaskParams(req));
    res.status(204).send('ok');
  }
  catch(errors){
    res.status(422).json({ errors });
  }
};

const destroy = async(req, res) => {
  const task = await Task.findByPk(req.params.id);
  await task.destroy();
  res.status(204).send('ok');
};

const summary = async(req, res) => {
  const total = await Task.count();
  const completed = await Task.scope('completed').count();
  const overdue = await Task.scope('overdue').count();

  res.json({ total, completed, overdue });
};

const permitTaskParams = (req) => ({
  title: req.body.title,
  body: req.body.body,
  deadlineAt: req.body.deadline,
});


module.exports = {
  create,
  index,
  showById,
  showByUserId,
  myTasks,
  complete,
  update,
  summary,
  destroy
};
