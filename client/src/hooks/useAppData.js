import { useState, useEffect } from "react";
const axios = require('axios').default;


export default function useApplicationData() {
  const fakeProjects = [
    {
      id: 1,
      name: "react-app",
      lead: "Amy",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 2,
      name: "Ruby",
      lead: "Bell",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ];


  const [state, setState] = useState({
    user:null,
    project:null,
    users:{},
    projects: []
  });
  // fetch the initial data in database;
  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:5000";
    Promise.all([
      axios.get('/projects'),
      axios.get('/users'),
      // axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ 
        ...prev, projects: all[0].data, users: all[1].data
        // , 
        // interviewers: all[2].data, spots: all[0].data.spots 
      }));
      // console.log(all)
    })
  }, []);

  //update project state when user click on a project
  const setProject = project => setState({ ...state, project });
  //update user state when user click on a user
  const setUser = user => setState({ ...state, user });

  //update projects state when user do a search
  const setProjects = projects => setState({...state, projects})

  const setUsers = users => setState({...state, users})



  
  
  return { state, setProject, setProjects, setUser , setUsers}
}