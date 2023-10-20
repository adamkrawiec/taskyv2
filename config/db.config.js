require('dotenv').config();

module.exports = {
  development: {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "postgres",
    PASSWORD: process.env.DB_PASSWORD || "postgresadmin",
    db_name: process.env.DB || "tasky",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "postgresadmin",
    db_name: "tasky_test",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  production: {

  }
}
