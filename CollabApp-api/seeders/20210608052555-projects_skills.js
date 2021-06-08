'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('projects_skills', [{
      ProjectId: 1,
      SkillId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProjectId: 1,
      SkillId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProjectId: 2,
      SkillId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProjectId: 3,
      SkillId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProjectId: 3,
      SkillId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projects_skills', null, {});
  }
};
