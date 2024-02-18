'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'type', {
      type: Sequelize.ENUM('admin', 'learner'),
      allowNull: false,
      defaultValue: 'learner',
    
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'type');
  }
};
