const { DataTypes } = require('sequelize');
const { sequelize } = require('#db');

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
});

module.exports = User;
