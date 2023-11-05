const app = require('../app.js');
const db = require('../db.js');
const request = require('supertest');


let dbConnection;

const connectDB = async () => {
  dbConnection = await db.sequelize.sync({ force: true });
};

const disconnectDB = async () => {
  if(!dbConnection) return;

  await dbConnection.close();
};

const requestApp = request(app);

module.exports = {
  connectDB,
  disconnectDB,
  requestApp,
};
