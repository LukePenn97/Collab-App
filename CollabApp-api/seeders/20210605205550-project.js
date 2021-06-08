'use strict';
const fakerData = require('../helpers/fakerData');

const projects = [];
while (projects.length < 20) projects.push(fakerData.projectData());

// const projects = [...Array(10)].map((project) => (
//   {
//     projectLeadId: faker.random.number(10, 50),
//     name: faker.intenet.domainName(),
//     description: faker.lorem.sentence(),
//     imgUrl: faker.image.technics(),
//     deadline: faker.date.soon(),
//     startDate: faker.date.recent()
//   }
// ))
console.log()
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('projects', projects, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projects', null, {});
  }
};