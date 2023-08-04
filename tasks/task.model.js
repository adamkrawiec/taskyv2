const { sequelize, Sequelize, DataTypes } = require("./db");

const Task = sequelize.define("tasks", {
  title: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.STRING,
  },
  completed: {
    type: DataTypes.BOOLEAN,
  },
  createdAt: {
    type: DataTypes.DATE
  },
  completedAt: {
    type: DataTypes.DATE
  }
})

module.exports = Task;
