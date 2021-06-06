'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projects_Skills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Projects_Skills.init({
    projectId: DataTypes.INTEGER,
    skillsId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'projects_skills',
    modelName: 'Projects_Skills',
  });
  return Projects_Skills;
};