'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class completed_goals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  completed_goals.init({
    userId: DataTypes.INTEGER,
    goalId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'completed_goals',
  });
  return completed_goals;
};