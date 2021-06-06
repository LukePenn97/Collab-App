'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('skills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      javascript: {
        type: Sequelize.BOOLEAN
      },
      python: {
        type: Sequelize.BOOLEAN
      },
      react: {
        type: Sequelize.BOOLEAN
      },
      ruby: {
        type: Sequelize.BOOLEAN
      },
      css: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('skills');
  }
};