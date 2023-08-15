const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../db");

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fullName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = User;
