require('dotenv').config({path: '.env'}); // this is important!
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
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
