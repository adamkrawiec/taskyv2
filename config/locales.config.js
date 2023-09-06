const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const i18nextMiddleware = require('i18next-http-middleware');

i18next.use(Backend).init({
  initImmediate: false,
  preload: ['en'],
  lng: 'en',
  fallbackLng: 'en',
  saveMissing: true,
  debug: true,
  backend: {
    loadPath: "./config/locales/{{lng}}/{{ns}}.json"
  }
})

module.exports = {
  i18nextMiddleware: i18nextMiddleware.handle(i18next)
}
