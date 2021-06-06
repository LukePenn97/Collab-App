const router = require("express").Router();
const User = require('../models/user.js')
const Project = require('../models/Project.js')

//get user list
router.get('/', (req, res) =>
User.findAll()
  .then(users => {
    console.log("Users:", users);
    Project.findAll()
    .then(projects => console.log("projects:", projects))
    
    res.sendStatus(200);
  })
  .catch(err => console.log("Error:"+ err)));

module.exports = router;