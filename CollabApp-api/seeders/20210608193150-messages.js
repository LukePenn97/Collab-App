'use strict';

const fakerData = require('../helpers/fakerData');

const messages = [];

for (let i = 1; i <= 200; i++) {
  messages.push(fakerData.messageData(200,100));
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('messages', messages, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('messages', null, {});
  }
};
