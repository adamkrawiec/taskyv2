const Task = require('#app/tasks/Task.model');
const { faker } = require('@faker-js/faker');
const { times } = require('lodash');
const { createItem } = require('./item.factory');

const createTask = async ({ user }) => {
  let item = await createItem();
  let taskAttrs = {
    userId: user.id,
    itemId: item.id,
    deadlineAt: faker.date.soon({ days: 5 })
  };

  return await Task.create(taskAttrs);
};

const createList = (count) => {
  return times(count, async() => { await createTask(); });
};

module.exports = {
  createTask,
  createList
};
