const {
  connectDB,
  disconnectDB,
  requestApp,
} = require('#test_setup');

const { createTask, createTasks } = require('#factories/task.factory');
const { createUser } = require('#factories/user.factory');

describe('Task endpoints', () => {
  let user;
  let tasks;
  let userTask;
  let response;

  beforeAll(async () => {
    await connectDB();

    user = await createUser();
    tasks = await createTasks(5);
    userTask = await createTask({ user });
    await createTask({ user, overdue: true });
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe('GET /tasks', () => {
    beforeAll(async() => {
      response = await requestApp.get('/tasks');
    });

    it('response returns status 200', async () => {
      expect(response.status).toEqual(200);
    });

    it('response returns tasks', async () => {
      expect(response.body.data).toContainEqual(
        expect.objectContaining({ id: userTask.id })
      );
    });
  });

  describe('POST /tasks', () => {

  });

  describe('GET /tasks/:id', () => {
    let task;

    beforeAll(async () => {
      task = tasks[0];
      task.user = await task.getUser();
      task.item = await task.getItem();
      response = await requestApp.get(`/tasks/${task.id}`);
    });

    it('response returns status 200', async () => {
      expect(response.status).toEqual(200);
    });

    it('response returns task data', async () => {
      expect(response.body.data).toEqual(
        expect.objectContaining(
          {
            id: task.id,
            deadlineAt: task.deadlineAt.toJSON(),
            user: expect.objectContaining(
              {
                id: task.user.id,
                fullName: task.user.fullName
              }
            ),
            item: expect.objectContaining(
              {
                id: task.item.id,
                title: task.item.title
              }
            )
          }
        )
      );
    });
  });

  describe('GET /tasks/user/:userId', () => {

  });
});
