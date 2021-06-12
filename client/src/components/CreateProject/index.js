
import React, {useState} from "react";
import Select from 'react-select';
import axios from 'axios';
import Cookies from "universal-cookie";
import {
    Label,
    Input,
    Textarea,
    Checkbox,
  } from '@rebass/forms'
import Button from "../Button";

// creat project initiation;
  const cookies = new Cookies();
  const options = [
    { key: "skillId1", value: 1, label: 'Javascript', isFixed: true },
    { key: "skillId2", value: 2, label: 'React', isFixed: true},
    { key: "skillId3", value: 3, label: 'Ruby', isFixed: true },
    { key: "skillId4", value: 4, label: 'SQL', isFixed: true },
    { key: "skillId5", value: 5, label: 'Express', isFixed: true },
  ];
  const initialValues = {
    id: 0,
    projectLeadId: 1,
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
  const [project, setProject] = useState(initialValues);
    const currentUser = cookies.get("currentUser");

    // Final submit handler
    //(axios returns a complete project object with the id of database and ubdates the state)
    //skills will be inserted into the projects_skills table through the backend route
    //new project available through the state:project
    const submitProject = () => {
      setProject({
        ...project,
        projectLeadId: currentUser
      });
      const url = `http://localhost:5000/projects/new`
      return axios.post(url, {"projects": project})
        .then((data) => {
          // props.pickAProject(data)
          setProject({
            ...project,
            id: data.data
          });
        })
      }
      // Change handler for all inputs except skills
      const handleInputChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setProject({
          ...project,
          [name]: value,
        });
      };
      // Change handler for selected skills
      const onSkillsChanged = (e) => {
        const _skills = []
        for (const elem of e) {
          _skills.push(elem.value)
        }
        setProject(prev => ({
          ...prev,
          skills: _skills
        }))
      }
  return (
    <article>

    <h2>--------------------Create Project-----------------</h2>

    <box
    as='form'
    py={3}>
    <flex mx={-2} mb={3}>
        <box width={1/2} px={2}>
        <label htmlFor='Title'>Name</label><br /><br />
        <Input
            id='title'
            type='text'
            name='name'
            value={project.name}
            placeholder='My Project'
            onChange={handleInputChange}
        />
        <br /><br />
        <Label htmlFor='Description'>Description</Label><br />
        <Textarea
            id='description'
            type='text'
            name='description'
            value={project.description}
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
        <label htmlFor='Title'>URL</label><br /><br />
        <Input
            id='URL'
            type='text'
            name='url'
            value={project.url}
            placeholder='My Project URL'
            onChange={handleInputChange}
        />
        <br />
        <label htmlFor='Title'>Image URL</label><br /><br />
        <Input
            id='ImgURL'
            type='text'
            name='imgUrl'
            value={project.umageUrl}
            placeholder='My Project Image URL'
            onChange={handleInputChange}
        />
        <br />
        <label htmlFor='Title'>Deadline</label><br /><br />
        <Input
            id='Deadline'
            type='date'
            name='deadline'
            value={project.deadline}
            placeholder='My Project deadline'
            onChange={handleInputChange}
        />
        <br />
        <label htmlFor='Title'>Start Date</label><br /><br />
        <Input
            id='startDate'
            type='date'
            name='startDate'
            value={project.startDate}
            placeholder='My Project Start Date'
            onChange={handleInputChange}
        />
        <br />
        <label htmlFor='Title'>End Date</label><br /><br />
        <Input
            id='endDate'
            type='date'
            name='endDate'
            value={project.endDate}
            placeholder='My Project End Date'
            onChange={handleInputChange}
        />
        <br /><br />
        </box><br />
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
               onClick={submitProject}>Register</button>
            </box>
        </flex>
        </box>
    </article>
  )
}
