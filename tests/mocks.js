const mockQueue = () => ({
  process: jest.fn(),
  add: jest.fn()
});

const queueNames = ['#queues/mail_queue', '#queues/tasks-queue','#queues/web-scrape.queue'];

queueNames.map((queueName) => jest.mock(queueName, mockQueue));

jest.mock('open-graph-scraper', () =>
  jest.fn().mockImplementation(
    ({ url }) => ({
      result: {
        ogTitle: `Scraped title from url: ${url}`
      }
    })
  )
);
