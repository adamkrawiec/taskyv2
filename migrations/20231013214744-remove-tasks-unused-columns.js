'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.removeColumn('tasks', 'title');
    queryInterface.removeColumn('tasks', 'body');
    queryInterface.removeColumn('tasks', 'status');
  },

  async down (queryInterface, Sequelize) {
    queryInterface.addColumn('tasks', 'title');
    queryInterface.addColumn('tasks', 'body');
    queryInterface.addColumn('tasks', 'status');
  }
};
