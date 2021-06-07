const { Sequelize, sequelize, User, Project, Users_projects, Goals, mentor_requests, messages, Projects_skills, Skills, Users_skills } = require('./models/')

const PORT = process.env.PORT || 5000;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CollabApp Routes
// app.use('/register', require('./routes/register'));
app.use('/users', require('./routes/users'));
app.use('/projects', require('./routes/projects'));
app.use('/', (req, res) => res.send("Hello World. This is the CollabApp"));



app.listen(PORT, async () => {
    console.log(`Server started on port, ${PORT}`);
    await sequelize.authenticate()
    console.log('database synced!')
});