const TaskSummary = require('#app/tasks/services/task-summary.service');
const { connectDB, disconnectDB } = require('#test_setup');
const { createTask } = require('#factories/task.factory');
const { createItem } = require('#factories/item.factory');
const { createUser } = require('#factories/user.factory');

describe('TaskSummary', () => {
  let item;
  let user;

  beforeAll(async () => {
    await connectDB();
    item = await createItem();
    user = await createUser();
    await createTask();
    await createTask({ completed: true, user});
    await createTask({ overdue: true, user });
    await createTask({ item });
    await createTask({ user });
  });

  afterAll(async() => {
    await disconnectDB();
  });

  describe('getSummary', () => {
    it('returns count of open, completed and overdue tasks', async () => {
      let summary = await TaskSummary.getSummary({ query: {} });

      expect(summary).toEqual(
        [ { status: 'open', count: 3 },
          { status: 'completed', count: 1 },
          { status: 'overdue', count: 1 } ]
      );
    });

    it('returns count of open, completed and overdue tasks for item', async () => {
      let summary = await TaskSummary.getSummary({ query: { item_id: item.id } });

      expect(summary).toEqual(
        [ { status: 'open', count: 1 } ]
      );
    });

    it('returns count of open, completed and overdue tasks for user', async () => {
      let summary = await TaskSummary.getSummary({ query: { user_id: user.id } });

      expect(summary).toEqual(
        [ { status: 'completed', count: 1 },
          { status: 'open', count: 1 },
          { status: 'overdue', count: 1 } ]
      );
    });
  });
});
