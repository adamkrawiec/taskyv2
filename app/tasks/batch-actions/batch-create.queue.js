const { tasksQueue } = require('#queues/tasks-queue');
const batchCreateTasks = require('./batch-create.service');

tasksQueue.process(async (job, done) => {
  await batchCreateTasks(job.data);
  done();
});

module.exports = { createTasksQueue: tasksQueue };
