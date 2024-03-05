const app = require('./app.js');
const db = require('./db');
const swaggerDocs = require('./swagger');

const PORT = 3000;

db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.');
    app.listen(PORT, () => {
      console.log(`[server]: Server is running on a port ${PORT}`);
    });
    swaggerDocs(app)
  })
  .catch((err) => console.log('Failed to sync db: ' + err.message));
