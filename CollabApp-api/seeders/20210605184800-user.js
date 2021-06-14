'use strict';

const fakerData = require('../helpers/fakerData');

const users = [];
while (users.length <= 200) {
  users.push(fakerData.userData());
}
while (users.length < 250) {
  users.push({...fakerData.userData(), is_mentor: true});
}
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('users', users, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
