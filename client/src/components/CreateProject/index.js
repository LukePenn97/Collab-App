import React, {useState} from "react";
import Select from 'react-select';
import { Redirect } from 'react-router'
import axios from 'axios';
import Cookies from "universal-cookie";
import {
    Label,
    Input,
    Textarea,
    Checkbox,
  } from '@rebass/forms'
import StateManager from "react-select";


// creat project initiation;
  const cookies = new Cookies();
  const currentUser = cookies.get("currentUser");
  const options = [
    { key: "skillId1", value: 1, label: 'Javascript', isFixed: true },
    { key: "skillId2", value: 2, label: 'React', isFixed: true},
    { key: "skillId3", value: 3, label: 'Ruby', isFixed: true },
    { key: "skillId4", value: 4, label: 'SQL', isFixed: true },
    { key: "skillId5", value: 5, label: 'Express', isFixed: true },
  ];
  const initialValues = {
    id: 0,
    projectLeadId: Number(currentUser),
    name: "",
    description: "",
    skills: [],
    url: "",
    imgUrl: "",
    deadline: "",
    startDate: "",
    endDate: ""
  };

export default function CreateProject(props) {
  const [submitted, setSubmitted] = useState(false);
  const [newProject, setNewProject] = useState(initialValues);

    // Final submit handler
    //(axios returns a complete project object with the id of database and ubdates the state)
    //skills will be inserted into the projects_skills table through the backend route
    //new project available through the state:project
    const submitNewProject = () => {

      const url = `http://localhost:5000/projects/new`
      return axios.post(url, {"projects": newProject})
        .then((data) => {
          newProject.id = data.data;
          const updateProject = props.projects.push(newProject);
          props.setProjects(updateProject);
          const myProject = props.projects.find(project => project.id === data.data);
          //console.log(myProject, newProject);
          props.pickAProject(myProject);
          setSubmitted(true);
        })
        .catch(err => console.log(err))
      }
      // if (submitted) {
      //   return props.pickAProject(newProject)
      //   return <Redirect push to={{
      //     pathname: `/`,
      //     // pathname: `/${newProject.id}/findUsers`,
      //     // state: {data: newProject}
      //   }}
      //   />
      // }
      if (currentUser === "undefind") {
        return <Redirect push to={{
          pathname: `/register`,
        }}
        />
      }
      // Change handler for all inputs except skills
      const handleInputChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setNewProject({
          ...newProject,
          [name]: value,
        });
      };
      // Change handler for selected skills
      const onSkillsChanged = (e) => {
        const _skills = []
        for (const elem of e) {
          _skills.push(elem.value)
        }
        setNewProject(prev => ({
          ...prev,
          skills: _skills
        }))
      }
  return (

    <article>

    <h2>--------------------Create Project-----------------</h2>
    <box as='form' py={3}>
      <flex mx={-2} mb={3}>
        <box width={1/2} px={2}>
          <label htmlFor='Title'>Name</label><br /><br />
          <Input
            id='title'
            type='text'
            name='name'
            value={newProject.name}
            placeholder='My Project'
            onChange={handleInputChange}
          />
          <br /><br />
          <Label htmlFor='Description'>Description</Label><br />
          <Textarea
            id='description'
            type='text'
            name='description'
            value={newProject.description}
            placeholder='My Project description'
            onChange={handleInputChange}
            rows="4" cols="50"
          /><br />
        <box width={1/2} px={2}>
          <label htmlFor='skills'><strong>Required Skills </strong></label>
          <Select onChange={onSkillsChanged}
            isMulti

            name="project.skills"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            >
          {options.map((option) => (
            <option key={option.key} value={option.value}>{option.label}</option>
          ))}
          </Select>
        </box><br /><br />
        <label htmlFor='URL'>URL</label><br /><br />
        <Input
            id='URL'
            type='text'
            name='url'
            value={newProject.url}
            placeholder='My Project URL'
            onChange={handleInputChange}
        />
        <br />
        <label htmlFor='imageUrl'>Image URL</label><br /><br />
        <Input
            id='ImgURL'
            type='text'
            name='imgUrl'
            value={newProject.umageUrl}
            placeholder='My Project Image URL'
            onChange={handleInputChange}
        />
        <br />
        <label htmlFor='deadLine'>Deadline</label><br /><br />
        <Input
            id='Deadline'
            type='date'
            name='deadline'
            value={newProject.deadline}
            placeholder='My Project deadline'
            onChange={handleInputChange}
        />
        <br />
        <label htmlFor='startDate'>Start Date</label><br /><br />
        <Input
            id='startDate'
            type='date'
            name='startDate'
            value={newProject.startDate}
            placeholder='My Project Start Date'
            onChange={handleInputChange}
        />
        <br />
        <label htmlFor='endDate'>End Date</label><br /><br />
        <Input
            id='endDate'
            type='date'
            name='endDate'
            value={newProject.endDate}
            placeholder='My Project End Date'
            onChange={handleInputChange}
        />
        <br /><br />
        </box>
        </flex>
        <flex mx={-2} flexWrap='wrap'>
            <Label width={[1/2, 1/4]} p={2}>
            <Checkbox
                id='remember'
                name='remember'
            />
            Remember Me
            </Label>
            <box px={2} ml='auto'><br /><br />
            <button
              onClick={submitNewProject}>Register</button>
            </box>
        </flex>
      </box>
    </article>
  )
}
