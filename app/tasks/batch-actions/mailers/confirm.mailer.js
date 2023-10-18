const { mailDefaultOptions, transporter } = require("#config/mail.config")

const confirmTasksCreated = async (task, user) => {
  const mailOptions = {
      from: mailDefaultOptions.from,
      to: user.email,
      subject: mailDefaultOptions.i18next.t("mailers.tasks.batch-actions.confirm.title"),
      template: 'tasks/batch-actions/confirm',
  };
  await transporter.sendMail(mailOptions);
};

module.exports = {
  confirmTasksCreated,
}
