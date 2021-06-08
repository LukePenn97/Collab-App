const router = require("express").Router();
const {sequelize, User, Skill, Users_Skills } = require('../models');


//get user list
router.get('/', (req, res) =>
User.findAll({include: "user_skills"})
  .then(users => {
    console.log("Users:", users);
    res.set('Access-Control-Allow-Origin','*');
    res.json(users);
  })
  .catch(err => console.log("Error:"+ err)));

//get user's skills by ID
router.get('/:id/skills', (req, res) =>
Users_Skills.findAll({include: Skill, where: {userId: req.params.id}})
  .then(skills => {
    console.log("Users:", skills.dataValues);
    return res.json(skills);
  })
  .catch(err => console.log("Error:"+ err))
);

//get user by ID
router.get('/:id', (req, res) =>
User.findByPk(req.params.id)
  .then(users => {
    console.log("Users:", users.dataValues);
    res.set('Access-Control-Allow-Origin','*');
    return res.json(users);
    
  })
  .catch(err => console.log("Error:"+ err))
);

//get user's skills.
router.get('/:id/skills', async(req, res) => {
  try {
      const skills = Users_Skills.findAll({
        where: {
          UserId: req.params.id
        }
      }).then(skills => {
        console.log("SKILLS:",skills)
        return res.json(skills)
      })
  } catch (err) {
      console.log(err)
      return res.status(500).json(err);
  }

});

//patch (update) user's skills.
router.post('/:id/skills', async(req, res) => {
  const { javascript, phyton, react, ruby, css } = req.body
  try {
      const userSkill = await Skill.create({javascript, phyton, react, ruby, css})
      const  skillId = await Users_Skills.create({userId: req.params.id, skillId: userSkill.id})
      return res.json(userSkill, skillId)
  } catch (err) {
      console.log(err)
      return res.status(500).json(err);
  }

});

//patch (update) user's skills.
router.post('/:id/skills', async(req, res) => {
  const myItems = Object.values({ item1, item2, item3, item4, item5 } = req.body);
  const myId = [];
  try {
    for(elem of myItems) {
      skillId = await Skill.findOne({where: {
        name: elem
      }})
      const thisId = await Users_Skills.create({userId: req.params.id, skillId})
      myId.push(thisId);
    }
    return res.json(myId)
  } catch (err) {
      console.log(err)
      return res.status(500).json(err);
  }
});

//Post (create) new user
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

//patch (update) user's attr.
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

//Delete a user
router.delete('/:id', async(req, res) => {
    User.destroy({
    where: {
      id: req.params.id
    }
  }).then (data => {
    console.log("Deleting was successfull for user ID:", data);
    res.sendStatus(200);
  })
  .catch ((err) => {
      console.log(err)
      return res.status(500).json(err);
    });
});

module.exports = router;