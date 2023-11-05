const sendMailQueue = require('#queues/mail_queue');
const BatchCreateMailer = require('./batch-create.mailer');

sendMailQueue.process('task-batch-create-mailer', async (job, done) => {
  await BatchCreateMailer.batchTasksCreateConfirm(job.data.currentUser, job.data.tasks);
  done();
});

module.exports = sendMailQueue;
