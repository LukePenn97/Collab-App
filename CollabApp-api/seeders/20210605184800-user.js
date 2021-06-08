'use strict';

const fakerData = require('../helpers/fakerData');

const users = [];
while (users.length < 100) {
  users.push(fakerData.userData());
}
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', users, {})},
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
