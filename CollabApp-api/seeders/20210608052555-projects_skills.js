'use strict';


const ProjectSkills = []

for (let i = 1; i <= 100; i++) {
  ProjectSkills.push({
    ProjectId: i,
    SkillId: Math.ceil(Math.random() * 5),
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('projects_skills', ProjectSkills, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projects_skills', null, {});
  }
};
