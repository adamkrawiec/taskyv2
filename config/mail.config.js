const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const transporter = nodemailer.createTransport(
  {
    port: 1025
  }
);

// point to the template folder
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve('./mailers/'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./mailers/'),
};

transporter.use('compile', hbs(handlebarOptions));

let mailDefaults = {
    from: '"Tasky" <no-reply@example.com>',
};

module.exports = {
  mailDefaults,
  transporter,
}
