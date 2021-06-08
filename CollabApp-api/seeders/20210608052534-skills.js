'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('skills', [{
      name: "Javascript",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "React",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Ruby",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "SQL",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Express",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('skills', null, {});
  }
};
