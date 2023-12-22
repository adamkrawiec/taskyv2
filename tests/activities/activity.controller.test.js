const { createActivity } = require('#factories/activity.factory');

const {
  connectDB,
  disconnectDB,
  requestApp,
} = require('#test_setup');

describe('Activity Endpoints', () => {
  let activity;
  let completedActivity;
  let response;
  let item;
  let user;

  beforeAll(async () => {
    await connectDB();

    activity = await createActivity();
    completedActivity = await createActivity({ verb: 'completed' });
    item = await activity.getItem();
    user = await activity.getUser();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe('GET /activities', () => {
    beforeAll(async() => {
      response = await requestApp.get('/activities');
    });

    it('response returns status 200', async () => {
      expect(response.status).toEqual(200);
    });

    it('response returns array of activities', () => {
      expect(response.body).toHaveProperty('activities');
      expect(response.body.activities).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: activity.id,
          verb: activity.verb,
        }),
        expect.objectContaining({ id: completedActivity.id }),
      ]));
    });

    it('response return data for associated user', () => {
      expect(response.body.activities).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: activity.id,
          user: expect.objectContaining({ id: user.id, fullName: user.fullName })
        }),
        expect.objectContaining({ id: completedActivity.id })
      ]));
    });

    it('response return data for associated item', () => {
      expect(response.body.activities).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: activity.id,
          item: expect.objectContaining({ id: item.id, title: item.title }),
        }),
        expect.objectContaining({ id: completedActivity.id })
      ]));
    });
  });
  describe('GET /activities with verb query', () => {
    beforeAll(async() => {
      response = await requestApp.get('/activities').query({ verb: 'completed' });
    });

    it('returns activity with matching verb', () => {
      expect(response.body.activities).not.toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: activity.id,
        })
      ]));

      expect(response.body.activities).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: completedActivity.id,
        })
      ]));
    });
  });
});
