//import React from 'react';
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
  TextField,
  FormLabel,
  Input,
  Checkbox,
  Typography,
  Button,
  CssBaseline,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import axios from 'axios';
import Cookies from "universal-cookie";
import MultiChipSelect from "./multiChipSelect";


// creat project initiation;
  const cookies = new Cookies();
  const currentUser = cookies.get("currentUser");

  

  // const options = [
  //   { key: "skillId1", value: 1, label: 'Javascript', isFixed: true },
  //   { key: "skillId2", value: 2, label: 'React', isFixed: true},
  //   { key: "skillId3", value: 3, label: 'Ruby', isFixed: true },
  //   { key: "skillId4", value: 4, label: 'SQL', isFixed: true },
  //   { key: "skillId5", value: 5, label: 'Express', isFixed: true },
  // ];

  const initialValues = {
    id: 0,
    projectLeadId: Number(currentUser),
    name: "",
    description: "",
    project_skills: [],
    project_users: [],
    project_messages: [],
    url: "",
    imgUrl: "",
    deadline: "",
    startDate: "",
    endDate: ""
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(2),
      padding: 10,
      margin: 'auto',
      maxWidth: '900px',

      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '600px'
      },
      '& .MuiButtonBase-root': {
        margin: theme.spacing(2),
      },
    },

    // paper: {
    //   backgroundColor: theme.palette.background.paper,
    //   border: '2px solid #000',
    //   boxShadow: theme.shadows[5],
    //   padding: theme.spacing(2, 4, 3),
    // },

    Heading: {
      margin: '0px',
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontWeight: '500',
      fontSize: '29px',
      lineHeight: '1.2',
      letterSpacing: '-0.24px',
      color: 'rgb(23, 43, 77)'
    }
  }));


export default function CreateProject(props) {
  const options = props.allSkills.map((skill)=>{
    //console.log(skill)
    return {value: skill.id, label: skill.name, isFixed: true}
  })
  const  allItems = options.map(s => ({ name: s.label, id: s.value }));
  const classes = useStyles();
  const [newProject, setNewProject] = useState(initialValues);
  // const [items, setItems] = useState(allItems);
  // const [selectedItem, setSelectedItem] = useState([]);

  const [state, setState] = useState({
    initItems: allItems,
    items: allItems,
    selectedItem:[],
    mySkills:[]
  });

  const setItems = items => setState({ ...state, items });
  const setSelectedItem = selectedItem => setState((prev) => {
    return {...prev, selectedItem};
  });
  const setMySkills = mySkills => setState((prev) => {
    return {...prev, mySkills};
  });
  const handleChange = selectedItem => {
    if (state.selectedItem.includes(selectedItem)) {
      removeSelectedItem(selectedItem);
    } else {
      addSelectedItem(selectedItem);
    }
  };

  const addSelectedItem = item => {
    let elm = state.initItems.find(i => i.name === item);
    setState((prev) => ({
      inputValue: "",
      ...prev,
      selectedItem: [...state.selectedItem, item],
      items: state.items.filter(i => i.name !== item),
      mySkills: [...state.mySkills, elm.id]
    }));
  }

  const removeSelectedItem = item => {
    let elm = state.initItems.find(i => i.name === item);
    setState((prev) => ({
      inputValue: "",
      ...prev,
      selectedItem: state.selectedItem.filter(i => i !== item),
      items: [...state.items, { name: item, id: elm.id }],
      mySkills: state.mySkills.filter(i => i !== elm.id)
    }));
  };

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
          console.log(myProject, newProject);
          props.pickAProject(myProject);
        })
        .catch(err => console.log(err))
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
       // e.preventDefault()
        console.log(e);
        setNewProject(prev => ({
          ...prev,
          project_skills: state.mySkills
        }))
      }
  return (

    <form className={classes.root} noValidate onSubmit={submitNewProject}>
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
      New Project Form
      </Typography>
      <Typography variant="h6" align="center" component="h2" gutterBottom>
        (All fields are required)
      </Typography>
    </div>
    <div>
          <TextField
            id='title'
            label="Title"
            variant="outlined"
            type='text'
            name='name'
            value={newProject.name}
            onChange={handleInputChange}
          />
      </div>
      <div>
          <TextField
            id='description'
            label='Description'
            type='text'
            name='description'
            variant="outlined"
            value={newProject.description}
            onChange={handleInputChange}
            multiline
            rowsMax={4}
          /><br />
      </div>
      <div style={{ width: "610px"}}>
      <FormGroup>
        <FormControl>
          <FormLabel>Find the skill needed for your project</FormLabel>
          <MultiChipSelect
            onInputValueChange={(e) => onSkillsChanged(e)}
            inputValue={state.inputValue}
            availableItems={state.items}
            selectedItem={state.selectedItem}
            onChange={(chip) => addSelectedItem(chip)}
            onRemoveItem={removeSelectedItem}
          />
        </FormControl>
      </FormGroup>
       </div>
       <div>
          <TextField
            id='URL'
            label="URL"
            variant="outlined"
            type='text'
            name='url'
            value={newProject.url}
            onChange={handleInputChange}
          />
      </div>
      <div>
          <TextField
            id='imgURL'
            label="Image URL"
            variant="outlined"
            type='text'
            name='imgUrl'
            value={newProject.imageUrl}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <FormLabel htmlFor='deadLine'>Deadline</FormLabel><br /><br />
        <Input
            id='Deadline'
            type='date'
            name='deadline'
            value={newProject.deadline}
            placeholder='My Project deadline'
            onChange={handleInputChange}
        />
        <br />
        <FormLabel htmlFor='startDate'>Start Date</FormLabel><br /><br />
        <Input
            id='startDate'
            type='date'
            name='startDate'
            value={newProject.startDate}
            placeholder='My Project Start Date'
            onChange={handleInputChange}
        />
        <br />
        <FormLabel htmlFor='endDate'>End Date</FormLabel><br /><br />
        <Input
            id='endDate'
            type='date'
            name='endDate'
            value={newProject.endDate}
            placeholder='My Project End Date'
            onChange={handleInputChange}
        />
        <br />
            <FormLabel width={[1/2, 1/4]} p={2}>
            <Checkbox
                id='remember'
                name='remember'
            />
            Remember Me
            </FormLabel>
            <Button variant="secondary" color="primary"
             onClick={submitNewProject}>Register</Button>
     </form>

  )
}
