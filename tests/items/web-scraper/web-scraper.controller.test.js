const Item = require('#app/items/item.model');
const WebScrapeQueue = require('#queues/web-scrape.queue');

const {
  connectDB,
  disconnectDB,
  requestApp,
} = require('#test_setup');

describe('WebScraperController', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe('POST /items/web-scrape', () => {
    beforeAll(async() => {
      response = await requestApp.post('/items/web-scrape').send({
        urls: ['www.example.com/page-1', 'www.example.com/page-2']
      });
    });

    it('response returns status 204', () => {
      expect(response.status).toEqual(204);
    });

    it('for each provieded url, enqueues a web-scrape job', async () =>{
      expect(WebScrapeQueue.add).toHaveBeenCalledTimes(2);
    });
  });
});
