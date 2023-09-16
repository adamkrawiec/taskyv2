'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.addIndex("tasks", ["completedAt"], { fields: "completedAt" });
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.removeIndex("Task", { fields: "completedAt" } );
  }
};
