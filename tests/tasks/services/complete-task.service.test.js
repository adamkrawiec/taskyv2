const { completeTask } = require('#app/tasks/services/complete-task.service');
const { createUser } = require('../../factories/user.factory');
const { createTask } = require('../../factories/task.factory');

const {
  connectDB,
  disconnectDB
} = require('#test_setup');

describe('CompleteTask.service', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('marks task as completed', async () => {
    let user = await createUser();
    let task = await createTask({ user });

    await completeTask(task.id);
    await task.reload();

    expect(task.completedAt).not.toBeNull();
  });
});
