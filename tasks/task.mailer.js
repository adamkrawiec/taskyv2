const { transporter } = require("../config/mail.config")

const emailCreated = async (task, user) => {
  const mailOptions = {
      from: '"Tasky" <no-reply@example.com>',
      to: user.email,
      subject: 'New Task assined',
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
