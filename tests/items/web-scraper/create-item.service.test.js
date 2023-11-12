const { createUser } = require('../../factories/user.factory');
const CreateItemService = require('#app/items/web-scraper/create-item.service');
const {
  connectDB,
  disconnectDB,
} = require('#test_setup');

describe('CreateItemService', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  let user = createUser();

  it('adds a new item, with content scraped from the page', async() => {
    let url = 'www.example.com';

    let item = await CreateItemService.addItemFromUrl({ url, currentUser: user });
    expect(item.title).toEqual('Scraped title from url: www.example.com');
  });

  it('saves the item to databas', async() => {
    let url = 'www.example.com';

    let item = await CreateItemService.addItemFromUrl({ url, currentUser: user });
    expect(item.id).not.toBeNull();
  });
});
