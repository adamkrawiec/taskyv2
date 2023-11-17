const { requestApp } = require('#test_setup');
const { createItem } = require('../../factories/item.factory');
const { createUser } = require('../../factories/user.factory');
const tasksQueue = require('#queues/tasks-queue');
const { faker } = require('@faker-js/faker');

describe('tasks batch actions endpoints', () => {
  let user;
  let item;
  let deadline;
  let response;

  beforeAll(async() =>{
    user = await createUser();
    item = await createItem();
    deadline = faker.date.soon({ days: 5 });
  });

  describe('POST /tasks/batch-actions', () => {
    beforeAll(async() => {
      response = await requestApp.post('/tasks/batch-actions').send({
        user_ids: [user.id],
        item_id: item.id,
        deadline: deadline
      });
    });

    it('response returns status 204', () => {
      expect(response.status).toEqual(204);
    });

    it('enqueues createTasksQueue', () => {
      expect(tasksQueue.add).toHaveBeenCalledWith({
        userIds: [user.id],
        itemId: item.id,
        deadlineAt: deadline.toJSON(),
        currentUser: null});
    });
  });
});
