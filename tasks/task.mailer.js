const { mailOptions, transporter } = require("../config/mail.config")


const emailCreated = async (task, user) => {
  mailOptions.to = user.email;
  mailOptions.subject = "New Task"
  mailOptions.text = "New Task assigned"
  mailOptions.html =  "<p>New Task assigned</p>"
  await transporter.sendMail(mailOptions);
};

module.exports = {
  emailCreated,
}
