const { Sequelize } = require('sequelize');

// Passing a connection URI
module.exports = new Sequelize('collabapp', 'ar', '12345', {
  host: 'localhost',
  dialect: 'postgres',
});