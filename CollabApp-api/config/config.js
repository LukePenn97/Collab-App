require('dotenv').config({path: '.env'});

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": "labber",
    "password": "labber",
    "database": "collabapp",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "labber",
    "password": "labber",
    "database": "collabapp",
    "host": "localhost",
    "dialect": "postgres"
  }
}
