const Queue = require("bull");
const redisConfig = require("../config/redis.config");

const tasksQueue = new Queue("tasks", {
  redis: redisConfig
});

module.exports = {
  tasksQueue
}
