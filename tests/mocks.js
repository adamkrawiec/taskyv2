jest.mock('#queues/mail_queue', () => ({
  process: jest.fn(),
  add: jest.fn()
}));

jest.mock('#queues/tasks-queue', () => ({
  process: jest.fn(),
  add: jest.fn()
}));
