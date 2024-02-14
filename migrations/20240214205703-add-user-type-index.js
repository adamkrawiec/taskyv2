'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addIndex('users', ['type']);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeIndex('users', ['type']);
  }
};
