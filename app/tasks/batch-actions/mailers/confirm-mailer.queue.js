const sendMailQueue = require('#queues/mail_queue');
const ConfirmMailer = require('./confirm.mailer');

sendMailQueue.process('confirm-batch-tasks-created-mailer-queue', async (job, done) => {
  await ConfirmMailer.confirmTasksCreated(job.data.user, job.data.tasks);
  done();
});

module.exports = sendMailQueue;
