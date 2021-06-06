const router = require("express").Router();
const db = require('../config/database')
const {sequelize, User } = require('../models');
// const User = require('../models/User.js')
// const User = require('../models/User.js')
// const Project = require('../models/project.js')

//get user list
router.get('/', (req, res) =>
User.findAll()
  .then(users => {
    console.log("Users:", users);
    res.sendStatus(200);
  })
  .catch(err => console.log("Error:"+ err)));

//get user by ID
router.get('/:id', (req, res) =>
User.findByPk(req.params.id)
  .then(users => {
    console.log("Users:", users.dataValues);
    res.sendStatus(200);
  })
  .catch(err => console.log("Error:"+ err)));

router.post('/', async(req, res) => {
  const { firstName, lastName, email, password } = req.body
  try {
      const user = await User.create({firstName, lastName, email, password})
      return res.json(user)
  } catch (err) {
      console.log(err)
      return res.status(500).json(err);
  }
});

router.patch('/:id', async(req, res) => {
  const { firstName, lastName, email, password } = req.body
  try {
      const user = await User.update({firstName, lastName, email, password},
        {where: {
          id: req.params.id
        }})
      return res.json(user)
  } catch (err) {
      console.log(err)
      return res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
    User.destroy({
    where: {
      id: req.params.id
    }
  }).then (data => {
    console.log("Deleting done successfully", data);
    res.sendStatus(200);
  })
  .catch ((err) => {
      console.log(err)
      return res.status(500).json(err);
    });
});

module.exports = router;