const router = require("express").Router();
const {sequelize, User } = require('../models');



//Post the register form
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
