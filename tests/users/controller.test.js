const User = require("#app/users/user.model");

const {
  connectDB,
  disconnectDB,
  disconnectWorkers,
  requestApp,
} = require('#test_setup');

describe('User Endpoints', () => {
  let user

  beforeAll(async () => {
    await connectDB();

    user = await User.create({
      fullName: "Test User",
      email: "test-user@example.com",
      "createdAt": "2023-10-20T22:23:32.609Z",
    });
  });

  afterAll(async () => {
    await disconnectDB();
    await disconnectWorkers();
  });

  it('GET /users should show all users', async () => {
    const res = await requestApp.get('/users');

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('users');
    // expect(res.body.users).toContain({
    //   id: 1,
    //   fullName: "Test User",
    //   email: "test-user@example.com",
    //   "createdAt": "2023-10-20T22:23:32.609Z",
    //   _links: {
    //     self: '/users/1'
    //   }
    // });
  });

  it('GET /user/:id should show all users', async () => {
    const res = await requestApp.get(`/users/${user.id}`);

    expect(res.status).toEqual(200);
    // expect(res.body.users).toContain({
    //   id: 1,
    //   fullName: "Test User",
    //   email: "test-user@example.com",
    //   "createdAt": "2023-10-20T22:23:32.609Z",
    //   _links: {
    //     self: '/users/1'
    //   }
    // });
  });

});
