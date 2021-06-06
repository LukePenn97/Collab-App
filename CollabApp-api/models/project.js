
'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      this.belongsTo(User, {foreignKey: 'projectLeadId'})
      this.belongsToMany(User, { as: "project", foreignKey: "projectId", through: 'users_projects' });
    }
  };
  Project.init({
    projectLeadId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
      },
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

