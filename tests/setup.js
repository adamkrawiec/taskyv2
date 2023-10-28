const app = require('../app.js');
const db = require('../db.js');
const { tasksQueue } = require('#queues/tasks-queue');
const { sendMailQueue } = require('#queues/mail_queue');
const request = require('supertest');

let dbConnection;

const connectDB = async () => {
  dbConnection = await db.sequelize.sync({ force: true });
};

const disconnectDB = async () => {
  if(!dbConnection) return;

  await dbConnection.close();
};

const disconnectWorkers = async () => {
  await tasksQueue.close();
  await sendMailQueue.close();
};

const requestApp = request(app);

module.exports = {
  connectDB,
  disconnectDB,
  disconnectWorkers,
  requestApp,
};
