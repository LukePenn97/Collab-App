'use strict';

const fakerData = require('../helpers/fakerData')

const projects = []

for (let i = 1; i <= 10; i++) {
  projects.push(fakerData.projectData(i))
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('projects', projects, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projects', null, {});
  }
};