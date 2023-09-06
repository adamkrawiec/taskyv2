const { mailDefaults, transporter } = require("../config/mail.config")

const emailCreated = async (task, user) => {
  const mailOptions = {
      from: mailDefaults.from,
      to: user.email,
      subject: texts.mailers.tasks.new_task.title,
      template: 'tasks/new_task',
      context: {
          userName: user.name,
          taskTitle: task.title,
          taskDeadline: task.deadline,
          taskId: task.id
      }
  };
  await transporter.sendMail(mailOptions);
};

module.exports = {
  emailCreated,
}
