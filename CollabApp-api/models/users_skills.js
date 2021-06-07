'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_Skills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Users_Skills.init({
    UserId: DataTypes.INTEGER,
    SkillId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'users_skills',
    modelName: 'Users_Skills',
  });
  return Users_Skills;
};