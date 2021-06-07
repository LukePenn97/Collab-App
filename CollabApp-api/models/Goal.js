'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Goal.init({
    projectId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.DATE,
    completedAt: DataTypes.DATE,
    completedBy: DataTypes.INTEGER,
    deadline: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'goals',
    modelName: 'Goal',
  });
  return Goal;
};