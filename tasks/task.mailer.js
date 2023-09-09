const { mailDefaultOptions, transporter } = require("../config/mail.config")

const emailCreated = async (task, user) => {
  const mailOptions = {
      from: mailDefaultOptions.from,
      to: user.email,
      subject: mailDefaultOptions.i18next.t("mailers.tasks.new_task.title"),
      template: 'tasks/new_task',
      context: {
          userName: user.name,
          taskId: task.id,
          taskTitle: task.title,
          taskDeadline: task.deadline
      }
  };
  await transporter.sendMail(mailOptions);
};

module.exports = {
  emailCreated,
}
