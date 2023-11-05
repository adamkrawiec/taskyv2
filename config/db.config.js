require('dotenv').config();

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
    }
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
