require('dotenv').config();
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
  transports: [new winston.transports.Console()],
});

module.exports = {
  development: {
    HOST: process.env.POSTGRES_HOST || 'localhost',
    USER: process.env.DB_USER || 'postgres',
    PASSWORD: process.env.DB_PASSWORD || 'postgresadmin',
    NAME: process.env.DB || 'tasky',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    benchmark: true,
    logging: (msg, time) => logger.info(`[Execution time: ${time}ms]: ${msg}`)
  },
  test: {
    HOST: process.env.POSTGRES_HOST || 'localhost',
    USER: 'postgres',
    PASSWORD: 'postgresadmin',
    NAME: 'tasky_test',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  },
  production: {

  }
};
