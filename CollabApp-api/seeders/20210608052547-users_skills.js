'use strict';

const userSkills = []

for (let i = 1; i <= 100; i++) {
  userSkills.push({
    UserId: i,
    SkillId: Math.ceil(Math.random() * 5),
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users_skills', userSkills, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users_skills', null, {});
  }
};
