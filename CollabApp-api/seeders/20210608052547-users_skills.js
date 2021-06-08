'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users_skills', [{
      UserId: 1,
      SkillId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      UserId: 1,
      SkillId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      UserId: 1,
      SkillId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      UserId: 2,
      SkillId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      UserId: 2,
      SkillId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users_skills', null, {});
  }
};
