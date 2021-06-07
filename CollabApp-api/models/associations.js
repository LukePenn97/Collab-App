const { sequelize, User, Project, users_projects, Goals, mentor_requests, messages, projects_skills, Skills, users_skills } = require('.')

function createAssociations() {
  User.belongsToMany(Project, { through: 'users_projects' })
  Project.belongsToMany(User, { through: 'users_projects' })
  User.hasMany(users_projects)
  Project.hasMany(users_projects)
  Goals.belongsTo(Project)
  Project.hasMany(Goals)
  User.belongsToMany(Project, { through: 'messages' })
  Project.belongsToMany(User, { through: 'messages' })
  User.belongsToMany(Project, { through: 'mentor_requests' })
  Project.belongsToMany(User, { through: 'mentor_requests' })
  User.belongsToMany(Skills, { through: 'users_skills' })
  Skills.belongsToMany(User, { through: 'projects_skills' })
  Project.belongsToMany(Skills, { through: 'users_skills' })
  Skills.belongsToMany(Project, { through: 'projects_skills' })
  User.belongsToMany(Goals, { through: 'completed_goals' })
  Goals.belongsToMany(User, { through: 'completed_goals' })
}

module.exports = createAssociations