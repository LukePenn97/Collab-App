const router = require("express").Router();
const { Project } = require('../models');

//get project list
router.get('/', (req, res) =>
Project.findAll()
  .then(projects => {
    console.log("Projects:", projects);
    res.sendStatus(200);
  })
  .catch(err => console.log("Error:"+ err)));

//get project by ID
router.get('/:id', (req, res) =>
Project.findByPk(req.params.id)
  .then(projects => {
    console.log("Projects:", projects.dataValues);
    res.sendStatus(200);
  })
  .catch(err => console.log("Error:"+ err)));

//get message by project ID
// router.get('/:id/chat', (req, res) =>
//   Message.findAll({
//     where: {
//       user_id: req.params.id
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