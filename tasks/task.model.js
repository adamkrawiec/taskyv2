const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../db");
const TaskStatuses = require("./statuses");
const User = require("../users/user.model");

const Task = sequelize.define("task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM(TaskStatuses),
    defaultValue: TaskStatuses[0],
    allowNull: false
  },
  completedAt: {
    type: DataTypes.DATE
  },
  deadlineAt: {
    type: DataTypes.DATE
  },
})

module.exports = Task;

User.hasMany(Task, {
  foreignKey: 'userId',
  as: 'user'
});
Task.belongsTo(User);
