import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  FormLabel,
  Typography,
  Button,
  Checkbox,
  CssBaseline
} from '@material-ui/core';
import axios from 'axios';
import Cookies from "universal-cookie";

// creat new user initiation;
  const cookies = new Cookies();

  const initialValues = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    project_users: [],
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: theme.spacing(2),
      padding: 10,
      margin: 'auto',
      maxWidth: '900px',


      '& .MuiTextField-root': {
        margin: 'theme.spacing(1)',
        width: '600px'
      },
      '& .MuiButtonBase-root': {
        margin: 'theme.spacing(2)',
      },
    },
  }));


export default function CreateUser(props) {
  const classes = useStyles();
  const [newUser, setNewUser] = useState(initialValues);

    // Final registration handler
    //(axios returns a complete user object with the id of database and ubdates the state)
    //new user available through the state:newUser
    const submitNewUser = () => {

      const url = `http://localhost:5000/register`
      return axios
      .post(url, {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password
      })
        .then((data) => {
          cookies.set("currentUser", data.data.id, { path: "/" });
          if (data.data.id !== 0) props.setUsers([...props.users, data.data]);
          else alert("You ID has not been recieved");
          props.pickSkills();
        })
        .catch(err => console.log(err))
      }

      // Change handler for all inputs except skills
      const handleInputChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setNewUser({
          ...newUser,
          [name]: value,
        });
      };

  return (

    <form className={classes.root} noValidate onSubmit={submitNewUser}>
    <div style={{
      padding: '20',
      margin: 'auto'
      }}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
      🏁🏁 Registration Form 🏁🏁
      </Typography>
      <Typography variant="h6" align="center" component="h2" gutterBottom>
        (All fields are required)
      </Typography>
    </div>
    <div>
          <TextField
            id='firstName'
            label="Your First Name"
            variant="outlined"
            type='text'
            name='firstName'
            value={newUser.firstName}
            onChange={handleInputChange}
          />
      </div>
      <div>
          <TextField
             id='lasttName'
             label="Your Last Name"
             variant="outlined"
             type='text'
             name='lastName'
             value={newUser.lastName}
             onChange={handleInputChange}
          /><br />
      </div>
       <div>
          <TextField
           id='email'
           label="Your Email"
           variant="outlined"
           type='text'
           name='email'
           value={newUser.email}
           onChange={handleInputChange}
          />
      </div>
      <div>
          <TextField
           id='password'
           label="Your Password"
           variant="outlined"
           type='text'
           name='password'
           value={newUser.password}
           onChange={handleInputChange}
          />
        </div>
        <br />

            <FormLabel width={[1/2, 1/4]} p={2}>
            <Checkbox
                id='remember'
                name='remember'
            />
            Remember Me
            </FormLabel>
            <Button variant="secondary" style={{backgroundColor:"rgb(245, 133, 63)"}}
             onClick={submitNewUser}>Register</Button>
     </form>

  )
}
