const nodemailer = require("nodemailer");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const transporter = nodemailer.createTransport(
  {
    port: 1025
  }
);

let mailOptions = {
    from: 'no-reply@tasky.com',
};

module.exports = {
  mailOptions,
  transporter,
}
