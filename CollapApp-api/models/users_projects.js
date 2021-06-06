'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  };
  users_projects.init({
    userId: {
      type: DataTypes.INTEGER
    },
    projectId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    tableName: 'users_projects',
    modelName: 'users_projects',
  });
  return users_projects;
};