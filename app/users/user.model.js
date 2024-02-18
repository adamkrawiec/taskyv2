const { DataTypes } = require('sequelize');
const { sequelize } = require('#db');
const USER_TYPES = require('./user_types');

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
    allowNull: false,
    unique: true
  },
  invitedAt: {
    type: DataTypes.DATE
  },
  acceptedAt: {
    type: DataTypes.DATE
  },
  type: {
    type: DataTypes.ENUM(USER_TYPES),
    allowNull: false,
    defaultValue: 'learner'
  }
});

module.exports = User;
