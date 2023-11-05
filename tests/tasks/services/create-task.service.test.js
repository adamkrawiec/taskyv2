const createTaskService = require('#app/tasks/services/create-task.service');
const sendMailQueue = require('#queues/mail_queue');
const { createUser } = require('../../factories/user.factory');
const { createItem } = require('../../factories/item.factory');
const { faker } = require('@faker-js/faker');

const {
  connectDB,
  disconnectDB
} = require('#test_setup');


describe('CreateTask.service', () => {
  let user;
  let item;

  beforeAll(async () => {
    await connectDB();

    user = await createUser();
    item = await createItem();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe('when service object is called with params for a new task', () => {
    it('persists a new task in db', async () => {
      let task = await createTaskService.createTask({
        userId: user.id,
        itemId: item.id,
        deadlineAt: faker.date.soon({ days: 5 })
      });

      expect(task.id).not.toBeNull();
    });

    it('enqueues an email informing task was assigned', async () => {
      await createTaskService.createTask({
        userId: user.id,
        itemId: item.id,
        deadlineAt: faker.date.soon({ days: 5 })
      });

      expect(sendMailQueue.process).toHaveBeenCalled();
    });
  });
});
