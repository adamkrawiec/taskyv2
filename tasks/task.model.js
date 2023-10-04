const { Sequelize, DataTypes, Op } = require('sequelize');
const { sequelize } = require("../db");
const TaskStatuses = require("./statuses");
const User = require("../users/user.model");
const Item = require("../items/item.model");

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

Task.belongsTo(User);
User.hasMany(Task, { foreignKey: 'userId' });

Task.belongsTo(Item, { foreignKey: 'itemId' });
Item.hasMany(Task, { foreignKey: 'itemId' });


Task.addScope('overdue', {
  where: {
    completedAt: { [Op.is]: null },
    deadlineAt: { [Op.lt]: Date.now() }
  }
});

Task.addScope('completed', { where: { completedAt: { [Op.not]: null } } });

module.exports = Task;
