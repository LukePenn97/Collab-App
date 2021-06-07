'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
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
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
