require('dotenv').config();
const { Sequelize } = require('sequelize');
const { Client } = require('pg');

const dbConfig = require('./config/db.config')[process.env.NODE_ENV];

async function ensureDB() {
  const client = new Client({
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    host: dbConfig.HOST,
  });

  client.connect();
  try {
    await client.query(`CREATE DATABASE "${dbConfig.NAME}"`);
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
    dbConfig.NAME,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
      host: dbConfig.HOST,
      dialect: dbConfig.dialect,
      operatorsAliases: false,
      logging: dbConfig.logging,
      benchmark: dbConfig.benchmark,
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

const db = {
  sequelize
};

module.exports = db;
