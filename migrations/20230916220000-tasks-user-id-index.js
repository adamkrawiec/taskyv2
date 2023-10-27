'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.addIndex('tasks', ['userId']);
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.removeIndex('tasks', ['userId']);
  }
};
