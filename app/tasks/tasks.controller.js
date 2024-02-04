const Task = require('./task.model');
const User = require('#app/users/user.model');
const Item = require('#app/items/item.model');
const taskDTO = require('./task.dto');
const TaskRepository = require('./task.repository');
const { createTask } = require('./services/create-task.service');
const { completeTask } = require('./services/complete-task.service');
const { getSummary } = require('./services/task-summary.service');

const index = async (req, res) => {
  if(!req.query.perPage) req.query.perPage = 20;

  let tasks = await TaskRepository.findTasks(req, { includes: [User, Item]});
  tasks = tasks.map((task) => taskDTO(task, req.currentUser));

  const title = req.t('tasks.index.title');
  res.json({ title, data: tasks });
};

const open = async(req, res) => {
  if(!req.query.perPage) req.query.perPage = 20;
  req.query.open = true;

  let tasks = await TaskRepository.findTasks(req, { includes: [Item]});
  res.json({ data: tasks.map((task) => taskDTO(task, req.currentUser)) });
};

const showById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, { include: [User, Item] });
    const taskdto = taskDTO(task, req.currentUser);

    res.json({ data: taskdto });
  }

  catch(error) {
    res.status(404).json({ error });
  }
};

const myTasks = async(req, res) => {
  let tasks = await req.currentUser.getTasks({ include: User });
  tasks = tasks.map((task) => taskDTO(task, req.currentUser));
  const title = req.t('tasks.my.title');

  res.json({ title, data: tasks });
};

const create = async (req, res) => {
  const { task, error }  = await createTask(req.body);

  if(task) {
    res.json(taskDTO(task, req.currentUser));
  } else {
    res.status(422).json({ errors: error.details });
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
  const summary = await getSummary(req);

  res.json(summary);
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
  myTasks,
  complete,
  update,
  summary,
  open,
  destroy
};
