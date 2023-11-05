const mockQueue = () => ({
  process: jest.fn(),
  add: jest.fn()
});

queueNames = ['#queues/mail_queue', '#queues/tasks-queue','#queues/web-scrape.queue'];

queueNames.map((queueName) => jest.mock(queueName, mockQueue));
