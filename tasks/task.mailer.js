const { mailDefaults, transporter } = require("../config/mail.config")

const emailCreated = async (task, user, t) => {
  const mailOptions = {
      from: mailDefaults.from,
      to: user.email,
      subject: t("mailers.tasks.new_task.title"),
      template: 'tasks/new_task',
      context: {
          userName: user.name,
          taskId: task.id,
      }
  };
  await transporter.sendMail(mailOptions);
};

module.exports = {
  emailCreated,
}
