const Queue = require('bull');
const redisConfig = require('../config/redis.config');

const webScrapeQueue = new Queue('web-scrape', {
  redis: redisConfig
});

module.exports = webScrapeQueue;
