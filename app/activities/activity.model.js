const { DataTypes } = require('sequelize');
const { sequelize }  = require('#db');

const User = require('#app/users/user.model');
const Item = require('#app/items/item.model');
const verbs = require('./verbs');

const Activity = sequelize.define('activity', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  verb: {
    type: DataTypes.ENUM,
    values: verbs
  }
});

Activity.Item = Activity.belongsTo(Item);
Item.hasMany(Activity);

Activity.User = Activity.belongsTo(User);
User.hasMany(Activity);


module.exports = Activity;
