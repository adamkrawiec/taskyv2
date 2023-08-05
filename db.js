const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("./config/db.config");
const { Client } = require("pg");

async function ensureDB() {
  const client = new Client({
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    host: dbConfig.HOST,
  });

  client.connect();
  try {
    const res = await client.query('CREATE DATABASE "tasky"');
    console.log('DB is successfully created');
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.end();
  }
}

function initDB() {
  ensureDB();
  return new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
      host: dbConfig.HOST,
      dialect: dbConfig.dialect,
      operatorsAliases: false,
      pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
      }
    }
  );
}

const sequelize = initDB();

const db =  {
  Sequelize,
  sequelize,
  DataTypes
};

module.exports = db;
