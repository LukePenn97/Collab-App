'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users_projects', [{
      UserId: 1,
      ProjectId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users_projects', null, {});
  }
};
