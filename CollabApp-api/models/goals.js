'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Goals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Goals.init({
    ProjectId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.DATE,
    completedAt: DataTypes.DATE,
    completedBy: DataTypes.INTEGER,
    deadline: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Goals',
  });
  return Goals;
};