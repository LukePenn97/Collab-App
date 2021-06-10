const router = require("express").Router();
const { Project, Users_Projects, Projects_Skills } = require('../models');

//get project list
router.get('/', (req, res) =>
Project.findAll({
  include: ["project_users", "project_skills", "project_messages"]})
  .then(projects => {
    console.log("Projects:", projects);
    res.set('Access-Control-Allow-Origin','*');
    res.json(projects);
  })
  .catch(err => console.log("Error:"+ err)));

//get project by ID
router.get('/:id', (req, res) =>
Project.findByPk(req.params.id)
  .then(projects => {
    console.log("Projects:", projects.dataValues);
    res.json(projects.dataValues);
    res.set('Access-Control-Allow-Origin','*');
  })
  .catch(err => console.log("Error:"+ err)));

//get message by project ID
// router.get('/:id/chat', (req, res) =>
//   Message.findAll({
//     where: {
//       project_id: req.params.id
//     }
//   })
//   .then(messages => {
//     console.log("Messages:", messages.dataValues);
//     res.sendStatus(200);
//   })
//   .catch(err => console.log("Error:"+ err))
// );


//Post (create) new project
router.post('/', async(req, res) => {
  const { name,
    description,
    url,
    imgUrl,
    deadline,
    startDate,
    endDate
  } = req.body
  try {
      const project = await Project.create({
        name,
        description,
        url,
        imgUrl,
        deadline,
        startDate,
        endDate
      })
      return res.json(project)
  } catch (err) {
      console.log(err)
      return res.status(500).json(err);
  }
});

//add user to project
router.post('/:id/adduser', async(req, res) => {
  const { id } = req.body
  try {
      const user_project = await Users_Projects.create({
        UserId: id,
        ProjectId: req.params.id
      })
      return res.json(user_project)
  } catch (err) {
      console.log(err)
      return res.status(500).json(err);
  }
});


//patch (update) project's skills.
router.post('/:id/addskills', async(req, res) => {
console.log("it's meeeee")
  const myItems = req.body;
  Promise.all(
    myItems.map(async (elem) => {
      await Projects_Skills.create({ProjectId: `${req.params.id}`, SkillId: `${elem}`});
    })
  )
  .then((data) => {
    console.log(data)
    res.sendStatus(200)
  })
  .catch((err) => {
      console.log(err)
      return res.status(500).json(err);
    });
});

//patch (update) project's attr.
router.patch('/:id', async(req, res) => {
  const { name,
    description,
    url,
    imgUrl,
    deadline,
    startDate,
    endDate
  } = req.body
  try {
      const project = await Project.update({
        name,
        description,
        url,
        imgUrl,
        deadline,
        startDate,
        endDate
       },
        {where: {
          id: req.params.id
        }}
        )
      return res.json(project)
  } catch (err) {
      console.log(err)
      return res.status(500).json(err);
  }
});

// //Delete a project
router.delete('/:id', async(req, res) => {
    Project.destroy({
    where: {
      id: req.params.id
    }
  }).then (data => {
    console.log("Deleting was successfull for project ID:", data);
    res.sendStatus(200);
  })
  .catch ((err) => {
      console.log(err)
      return res.status(500).json(err);
    });
});

module.exports = router;