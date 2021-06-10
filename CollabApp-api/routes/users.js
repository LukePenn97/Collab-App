const router = require("express").Router();
const {sequelize, User, Skill, Users_Skills, Projects_Skills, Sequelize, Project} = require('../models');
const Op = Sequelize.Op;


//get user list
router.get('/', (req, res) =>
User.findAll({include: ["user_skills", "user_messages"]})
  .then(users => {
    //console.log("Users:", users);
    res.set('Access-Control-Allow-Origin','*');
    res.json(users);
  })
  .catch(err => console.log("Error:"+ err)));

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
      await Users_Skills.findAll({
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
//Get user's match.
router.get('/:id/match', async(req, res) => {
  const UserId = req.params.id;
  let mySkill = [];
  //First query for finding the user's skils
    const userSkills = await Users_Skills.findAll({
      where: {UserId: UserId}
    })
    .then(async userSkills => {
      const skills = userSkills.map(ele => ele.dataValues.SkillId)
      console.log("SKILLS IN MATCH:", skills)
      // Second query for finding the projects' ids associated with user's skill ids
      const projectSkills = await Projects_Skills.findAll({
        where: {SkillId: {[Op.or]: skills}},
      }) // Third query for find the project listing using their ids
      .then(async projectSkills => {
        const projectIds = projectSkills.map(ele => ele.dataValues.ProjectId)
        const projects = await Project.findAll({
          where: {id: {[Op.or]: projectIds}},
        })
        res.json(projects)
      })
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).json(err);
    });
  });

//patch (update) user's skills.
router.post('/:id/skills', async(req, res) => {

  const myItems = req.body;
  Promise.all(
    myItems.map(async (elem) => {
      await Users_Skills.create({UserId: `${req.params.id}`, SkillId: `${elem}`});
    })
  )
  .then(() => res.sendStatus(200))
  .catch((err) => {
      console.log(err)
      return res.status(500).json(err);
    });
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