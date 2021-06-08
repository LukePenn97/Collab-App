'use strict';

const usersProjects = []

for (let i = 1; i <= 10; i++) {
  usersProjects.push({
    userId: i,
    projectId: Math.ceil(Math.random() * 10),
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