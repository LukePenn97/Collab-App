
'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  };
  Project.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    deadline: DataTypes.DATE,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'projects',
    modelName: 'Project',
  });
  return Project;
};

