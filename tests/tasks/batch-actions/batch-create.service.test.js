const { createItem } = require("../../factories/item.factory");
const { createUser } = require("../../factories/user.factory");
const { faker } = require('@faker-js/faker');
const batchCreateTasks = require('#app/tasks/batch-actions/batch-create.service');
const sendMailQueue = require('#queues/mail_queue');

describe('batchCreateTasks', () => {
  let item;
  let currentUser;
  let users;
  let userIds;

  beforeAll(async() => {
    item = await createItem();
    currentUser = await createUser();
    users = [await createUser(), await createUser()];
    userIds = users.map((user) => user.id);
  });

  it('adds a task, for the item, for every used in array', async () => {
    let tasks = await batchCreateTasks({
      userIds,
      itemId: item.id,
      deadlineAt: faker.date.soon({ days: 5 }),
      currentUser
    });

    tasks.map((task) => expect(task.id).not.toBeNull());
  });

  it('enqueues an email to confirm all tasks were assigned', async () => {
    await batchCreateTasks({
      userIds,
      itemId: item.id,
      deadlineAt: faker.date.soon({ days: 5 }),
      currentUser
    });

    expect(sendMailQueue.process).toHaveBeenCalled();
  });
});
