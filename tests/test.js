const app = require('../app.js');
const db = require('../db.js');
const request = require('supertest');
const User = require("#app/users/user.model");
const { tasksQueue } = require("#queues/tasks-queue");
const { sendMailQueue } = require("#queues/mail_queue");

describe('User Endpoints', () => {
  let dbConnection
  let redisConnection

  beforeAll(async () => {
    dbConnection = await db.sequelize.sync({ force: true });

    await User.create({
      fullName: "Test User",
      email: "test-user@example.com",
      "createdAt": "2023-10-20T22:23:32.609Z",
    });
  });

  afterAll(async () => {
    await dbConnection.close();
    await tasksQueue.close();
    await sendMailQueue.close();
  });

  it('GET /user should show all users', async () => {
    const res = await request(app).get('/users');

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

});
