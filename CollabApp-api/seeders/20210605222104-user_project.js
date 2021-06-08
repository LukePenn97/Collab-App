'use strict';

const usersProjects = []

for (let i = 1; i < 12; i++) {
  usersProjects.push({
    UserId: i,
    ProjectId:  i,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users_projects', usersProjects, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users_projects', null, {});
  }
};
