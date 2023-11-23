const Task = require('#app/tasks/task.model');
const { faker } = require('@faker-js/faker');
const { createItem } = require('./item.factory');
const { createUser } = require('./user.factory');

const createTask = async ({ user, item, overdue = false, completed = false } = {}) => {
  if(!item) item = await createItem();
  if(!user) user = await createUser();

  let taskAttrs = {
    userId: user.id,
    itemId: item.id,
    deadlineAt: overdue ? faker.date.past({ days: 5 }) : faker.date.soon({ days: 5 }),
    completedAt: completed ? faker.date.recent({ days: 1 }) : null
  };

  let task = await Task.create(taskAttrs, { include: [Task.User, Task.Item] });
  return task
};

const createList = async (count, attrs = {}) => {
  let tasks = [];
  for(let i = 0; i < count; i++) {
    tasks.push(await createTask(attrs));
  }
  return tasks
};

module.exports = {
  createTask,
  createList
};
