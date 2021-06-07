'use strict';

const fakerData = require('../helpers/fakerData')

const users = [{
    firstName: 'John',
    lastName: 'Doe',
    email: 'John@example.com',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Susan',
    lastName: 'Green',
    email: 'Susan@example.com',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Bob',
    lastName: 'Bobson',
    email: 'Bob@example.com',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

for (let i = 0; i < 10; i++) {
  users.push(fakerData.userData())
}

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('users', users, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
