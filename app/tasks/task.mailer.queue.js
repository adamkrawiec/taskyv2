const { sendMailQueue } = require('#queues/mail_queue');
const TaskMailer = require('./task.mailer');

sendMailQueue.process(async (job, done) => {
  await TaskMailer.emailCreated(job.data.task, job.data.user);
  done();

});

module.exports = {
  TaskMailerQueue: sendMailQueue,
};
