const Queue = require('bull');
const redisConfig = require('../config/redis.config');

const sendMailQueue = new Queue('sendMail', {
  redis: redisConfig
});

module.exports = sendMailQueue;
