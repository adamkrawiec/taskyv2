const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('#db');
const User = require('#app/users/user.model');
const Item = require('#app/items/item.model');

const Task = sequelize.define('task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  completedAt: {
    type: DataTypes.DATE
  },
  deadlineAt: {
    type: DataTypes.DATE
  },
});

Task.User = Task.belongsTo(User);
User.hasMany(Task, { foreignKey: 'userId' });

Task.Item = Task.belongsTo(Item, { foreignKey: 'itemId' });
Item.hasMany(Task, { foreignKey: 'itemId' });


Task.addScope('overdue', {
  where: {
    completedAt: { [Op.is]: null },
    deadlineAt: { [Op.lt]: Date.now() }
  }
});

Task.addScope('completed', { where: { completedAt: { [Op.not]: null } } });

module.exports = Task;
