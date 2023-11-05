const { mailDefaultOptions, transporter } = require('#config/mail.config');

const confirmTasksCreated = async (user) => {
  const mailOptions = {
    from: mailDefaultOptions.from,
    to: user.email,
    subject: mailDefaultOptions.i18next.t('mailers.tasks.batch-actions.create.title'),
    template: 'tasks/batch-actions/create_confirm',
    context: {
      count: tasks.length,
    }
  };
  await transporter.sendMail(mailOptions);
};

module.exports = {
  confirmTasksCreated,
};
