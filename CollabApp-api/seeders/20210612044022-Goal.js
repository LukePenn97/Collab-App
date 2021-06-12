'use strict';

const fakerData = require('../helpers/fakerData');

const goals = [];

for (let i = 1; i <= 200; i++) {
  goals.push(fakerData.goalData(100));
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('goals', goals, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('goals', null, {});
  }
};