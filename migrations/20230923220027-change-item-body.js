'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction (t => {
      return Promise.all([
        queryInterface.removeColumn('items', 'body', { transaction: t }),
        queryInterface.addColumn('items', 'body', { type: Sequelize.DataTypes.TEXT }, { transaction: t })
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction (t => {
      return Promise.all([
        queryInterface.removeColumn('items', 'body', { transaction: t }),
        queryInterface.addColumn('items', 'body', { type: Sequelize.DataTypes.STRING }, { transaction: t })
      ]);
    });
  }
};
