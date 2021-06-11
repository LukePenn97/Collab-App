import { useState, useEffect } from "react";
const axios = require("axios").default;

export default function useApplicationData() {

  const [state, setState] = useState({
    user: null,
    project: null,
    users: [],
    projects: [],
    roomName:"",
    currentUser:1
  });
  // fetch the initial data in database;
  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:5000";
    Promise.all([
      axios.get("/projects"),
      axios.get("/users"),
      // axios.get('/api/interviewers')
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        projects: all[0].data,
        users: all[1].data,
        // ,
        // interviewers: all[2].data, spots: all[0].data.spots
      }));
      // console.log(all)
    });
  }, []);



  //update project state when user click on a project
  const setProject = (project) => setState({ ...state, project });
  //update user state when user click on a user
  const setUser = (user) => setState({ ...state, user });
  const setCurrentUser = (currentUser) => setState({ ...state, currentUser });

  //update projects state when user do a search
  const setProjects = (projects) => setState({ ...state, projects });

  const setUsers = (users) => setState({ ...state, users });

  const setRoomName = (roomName) => setState({ ...state, roomName });



  return { state, setProject, setProjects, setUser, setUsers,setRoomName };
}
