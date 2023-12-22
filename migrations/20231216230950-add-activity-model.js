'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.createTable('activities', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
        allowNull: false
      },
      itemId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'items',
          },
          key: 'id',
        },
        allowNull: false,
      },
      verb: {
        type: DataTypes.ENUM,
        values: ['created', 'viewed', 'started', 'completed', 'updated']
      },
      updatedAt: {
        type: DataTypes.DATE
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
    });
  },

  async down (queryInterface) {
    return queryInterface.dropTable('activities');
  }
};
