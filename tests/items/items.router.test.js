const {
  connectDB,
  disconnectDB,
  requestApp,
} = require('#test_setup');
const { createItem } = require('#factories/item.factory');
const { createUser } = require('#factories/user.factory');


describe('Items endpoints', () => {
  let response;
  let item;
  let item2;
  let user;
  let admin;

  beforeAll(async () => {
    await connectDB();

    admin = await createUser({ type: 'admin' });
    user = await createUser();
    item = await createItem();
    item2 = await createItem({ visibility: 'all' });
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe('GET /items', () => {
    describe('when user is not logged in', () => {
      beforeAll(async () => {
        response = await requestApp.get('/items');
      });
  
      it('response returns status 403', async () => {
        expect(response.status).toEqual(403);
      });
    });

    describe('when admin is logged in', () => {
      beforeAll(async () => {
        response = await requestApp.get('/items').set('Cookie', [`session_id=${admin.id}`]);
      });
  
      it('response returns status 200', async () => {
        expect(response.status).toEqual(200);
      });
  
      it('response returns items', async () => {
        expect(response.body.items).toEqual(
          [
            expect.objectContaining({ id: item.id }),
            expect.objectContaining({ id: item2.id })
          ]
        );
      });

      describe('when user is logged in', () => {
        beforeAll(async () => {
          response = await requestApp.get('/items').set('Cookie', [`session_id=${user.id}`]);
        });
    
        it('response returns visible items', async () => {
          expect(response.body.items).toEqual(
            [
              expect.objectContaining({ id: item2.id }),
            ]
          );
        });
      });
    });
  });

  describe('POST /items', () => {
    describe('when user is not logged in', () => {
      beforeAll(async () => {
        response = await requestApp.post('/items').send(
          {
            title: 'New Item',
            body: 'New Item Description',
            visibility: 'all',
            url: 'example.com/new-item'
          }
        );
      });
  
      it('response returns status 403', async () => {
        expect(response.status).toEqual(403);
      });
    });

    describe('when admin is logged in', () => {
      beforeAll(async () => {
        response = await requestApp.post('/items').set('Cookie', [`session_id=${admin.id}`]).send(
          {
            title: 'New Item',
            description: 'New Item Description',
            visibility: 'all',
            url: 'example.com/new-item'
          }
        );
      });
  
      it('response returns status 200', async () => {
        expect(response.status).toEqual(200);
      });
    });
  });
});
