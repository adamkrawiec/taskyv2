const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path')
const { i18next } = require("./locales.config");

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
    helpers: {
      t: i18next.t,
      tWithArgs: (text, args) => i18next.t(text, args.hash)
    }
  },
  viewPath: path.resolve('./mailers/'),
};

transporter.use('compile', hbs(handlebarOptions));

const mailDefaultOptions = {
    from: '"Tasky" <no-reply@example.com>',
    i18next,
};

module.exports = {
  mailDefaultOptions,
  transporter
}
