const { Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require("#db");
const User = require("#app/users/user.model");

const Item = sequelize.define("item", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.STRING
  },
  visibility: {
    type: DataTypes.ENUM("hidden", "selected", "all"),
    defaultValue: "hidden"
  },
});

User.hasMany(Item, { foreignKey: "addedById" });
Item.belongsTo(User, { foreignKey: "addedById" });

module.exports = Item;
