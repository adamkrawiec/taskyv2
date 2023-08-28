const nodemailer = require("nodemailer");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const transporter = nodemailer.createTransport(
  {
    port: 1025
  }
);

let mailOptions = {
    from: 'test@example',
    to: "foo@example.com",
    subject: "Hello World",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
};


module.exports = {
  mailOptions,
  transporter,
}
