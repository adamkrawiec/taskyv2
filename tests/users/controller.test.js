const User = require('#app/users/user.model');

const {
  connectDB,
  disconnectDB,
  requestApp,
} = require('#test_setup');

describe('User Endpoints', () => {
  let user;
  let response;

  beforeAll(async () => {
    await connectDB();

    user = await User.create({
      fullName: 'Test User',
      email: 'test-user@example.com',
      createdAt: '2023-10-20T22:23:32.609Z',
      updatedAt: '2023-10-20T22:23:32.609Z',
      invitedAt: '2023-10-22T22:23:32.609Z',
      acceptedAt: '2023-10-22T22:23:32.609Z',
    });
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe('GET /users', () =>{
    beforeAll(async() => {
      response = await requestApp.get('/users');
    });

    it('response returns status 200', async () => {
      expect(response.status).toEqual(200);
    });

    it('response returns links', () => {
      expect(response.body).toHaveProperty('links');
    });

    it('response returns array of users', () => {
      expect(response.body).toHaveProperty('users');
      expect(response.body.users).toContainEqual(
        {
          id: 1,
          fullName: 'Test User',
          email: 'test-user@example.com',
          'createdAt': '2023-10-20T22:23:32.609Z',
          _links: {
            self: '/users/1'
          }
        }
      );
    });
  });

  describe('GET /users/:id', () => {
    beforeAll(async() => {
      response = await requestApp.get(`/users/${user.id}`);
    });

    it('response returns status 200', async () => {
      expect(response.status).toEqual(200);
    });

    it('response returns user details', () => {
      expect(response.body).toEqual(
        {
          id: 1,
          fullName: 'Test User',
          email: 'test-user@example.com',
          createdAt: '2023-10-20T22:23:32.609Z',
          invitedAt: '2023-10-22T22:23:32.609Z',
          acceptedAt: '2023-10-22T22:23:32.609Z',
          _links: { self: '/users/1', tasks: '/tasks/user/1' }
        }
      );
    });
  });

  describe('POST /users', () => {
    beforeAll(async() => {
      response = await requestApp.post('/users').send({
        fullName: 'Post Users test',
        email: 'put@example.com'
      });
    });

    it('response returns status 200', () => {
      expect(response.status).toEqual(200);
    });

    it('response returns created user data', () => {
      expect(response.body).toMatchObject(
        {
          id: 2,
          fullName: 'Post Users test',
          email: 'put@example.com',
        }
      );
    });
  });

  describe('PUT /users/:id', () => {
    beforeAll(async() => {
      response = await requestApp.put(`/users/${user.id}`).send({
        fullName: 'User Name updated'
      });
    });

    it('response returns status 200', () => {
      expect(response.status).toEqual(200);
    });

    it('changes user name', async () => {
      await user.reload();
      expect(user.fullName).toEqual('User Name updated');
    });
  });

  describe('DELETE /users/:id', () => {
    beforeAll(async() => {
      response = await requestApp.delete(`/users/${user.id}`);
    });

    it('response returns status 204', () =>
      expect(response.status).toEqual(204)
    );

    it('deletes record from db', async () => {
      let record = await User.findByPk(user.id);
      expect(record).toBeNull();
    });
  });
});
