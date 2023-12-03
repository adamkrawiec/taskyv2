const {
  connectDB,
  disconnectDB,
  requestApp,
} = require('#test_setup');

const { createTask, createTasks } = require("#factories/task.factory");
const createUser = require("#factories/user.factory");

describe("GET /tasks", () => {
  let user

  beforeAll(async () => {
    user = await createUser();
  });
});

describe("POST /tasks", () => {

});

describe("GET /tasks/:id", () => {

});

describe("GET /tasks/user/:userId", () => {

});
