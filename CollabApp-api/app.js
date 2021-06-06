const { sequelize, User, Project, users_projects, Goals, mentor_requests, messages, projects_skills, Skills, users_skills } = require('./models')

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios')
const fakerData = require('./helpers/fakerData');

// //Databse
// const db = require('./config/database')

// // Test db

// db.authenticate()
//     .then(() => console.log('Connection to database has been established successfully.'))
//     .catch (error => console.log('Unable to connect to the database. Error:'+ error));


const app = express();
app.use(express.json());



User.belongsToMany(Project, { through: 'users_projects' })
Project.belongsToMany(User, { through: 'users_projects' })
Goals.belongsTo(Project)
Project.hasMany(Goals)
User.belongsToMany(Project, { through: 'messages' })
Project.belongsToMany(User, { through: 'messages' })
User.belongsToMany(Project, { through: 'mentor_requests' })
Project.belongsToMany(User, { through: 'mentor_requests' })
User.belongsToMany(Skills, { through: 'users_skills' })
Skills.belongsToMany(User, { through: 'projects_skills' })
Project.belongsToMany(Skills, { through: 'users_skills' })
Skills.belongsToMany(Project, { through: 'projects_skills' })
User.belongsToMany(Goals, { through: 'completed_goals' })
Goals.belongsToMany(User, { through: 'completed_goals' })

app.post('/users', async(req, res) => {
    const { firstName, lastName, email, password } = req.body

    try {
        const user = await User.create({firstName, lastName, email, password})

        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
});

app.post('/projects', async(req, res) => {
    const { name, projectLeadId, } = req.body

    try {
        const user = await User.findOne({
            where: {id: projectLeadId}
        });
        const project = await Project.create({name, projectLeadId: user.id})

        return res.json(project)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
});

app.post('/projects/:id/adduser', async(req, res) => {
    const { id } = req.body

    try {
        const user = await User.findOne({
            where: {id}
        });
        const project = await users_projects.create({UserId: user.id, ProjectId: req.params.id})

        return res.json(project)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
});

// //CollabApp Routes
// app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 5000;

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll()

        return res.json(users)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOne({
            where: {id}
        });

        return res.json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
})

app.listen(PORT, async () => {
    console.log(`Server started on port, ${PORT}`);
    await sequelize.sync({ force: true })
    console.log('database synced!')
    axios
        .post('http://localhost:5000/users', fakerData.userData())
        .then(res => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
        })
        .catch(error => {
            console.error(error)
        })
    console.log("Faker Data:", )
});