const { sendMailQueue } = require('#queues/mail_queue');
const ConfirmMailer = require('./confirm.mailer');

sendMailQueue.process(async (job, done) => {
  await ConfirmMailer.confirmTasksCreated(job.data.currentUser);
  done();
});

module.exports = {
  ConfirmMailerQueue: sendMailQueue
};
