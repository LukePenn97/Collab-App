import React, {useState} from "react";
// import { useState, useEffect } from "react";
// import "./App.css";
import axios from 'axios';
import Cookies from "universal-cookie";



import Display from "./Display";
import NavBar from "./NavBar";
import MatchProject from "./MatchProject";
import ProjectDetail from "./ProjectDetail";
import Button from "./Button";
import ChatRoom from "./ChatRoom";
import Profile from "./Profile";
import Register from "./Register";
import Skills from "./Skills";
import CreateProject from "./CreateProject";
import SkillList from "./SkillList";
import { filterProjectsBySkills } from "../helpers/selectors";

import useVisualMode from "../hooks/useVisualMode";
import useAppData from "../hooks/useAppData";

import Cookies from "universal-cookie";

const cookies = new Cookies();


function App() {
  //set the initial state 
  const {
    state,
    setProject,
    setProjects,
    setUser,
    setUsers,
    setRoomName,
    setSkills,
    setMatchedProjects,
    setState
  } = useAppData();




//modes to navigate the components 
  const DISPLAY = "DISPLAY";
  const MATCH = "MATCH";
  const DETAIL = "DETAIL";
  const CHAT = "CHAT";
  const PROFILE = "PROFILE";
  const REGISTER = "REGISTER";
  const SKILLS = "SKILLS";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(DISPLAY);

  const [keyword, setKeyword] = useState([])

  const submitKeyword = () => {
    const url = `http://localhost:5000/projects/search`
    return axios.post(url, {"keyword": keyword})
      .then((body) => {
        let filteredProjects = filterProjectsBySkills(state.skills, body.data)
        setState(prev => ({...prev, projects: body.data, matchedProjects: filteredProjects}))
      })
  }

  const onKeywordChanged = () => {
    const _keyword = document.getElementById("searchbar");
    setKeyword(_keyword.value)
  }

  function backToHome() {
    transition(DISPLAY);
  }
  function pickAProject(project){
    setProject(project)
    transition(DETAIL)
  }
  function pickProjects(projects){
    setProjects(projects)
  }
  function pickAUser(user){
    setUser(user)
    transition(PROFILE)
  }
  function chatToAGroup(roomName){
    setRoomName(roomName)
    transition(CHAT)
  }
  function registration(){
    transition(REGISTER)
  }
  function pickSkills(user){
    // setUser(user)
    transition(SKILLS)
  }
  function createNewProject(){
    transition(CREATE)
  }

  function skillFilter(skill) {
    let newSkills;
    if (state.skills.includes(skill)) {
      let index = state.skills.indexOf(skill)
      newSkills = state.skills
      newSkills.splice(index, 1)
    } else {
      newSkills = [...state.skills, skill]
    }
    let filteredProjects = filterProjectsBySkills(newSkills, state.projects)
    console.log("newSkills in skillFilter",newSkills)
    //console.log("filteredProjects in skillFilter",filteredProjects)
    setState(prev=>({...prev, skills: newSkills, matchedProjects: filteredProjects}))
  }

  function autoMatch(skills) {
    for (const skill of skills) {
      skillFilter(skill);
    }
  }

  return (
    <main>
      <section>
        <div>
          <NavBar users={state.users} userId={cookies.get("currentUser")} backToHome={backToHome} registration={registration} createNewProject={createNewProject} autoMatch={autoMatch}/>
        </div>
      </section>
      <div class="container">
        {mode === DISPLAY &&
        <SkillList
            pickASkill={skillFilter}
        />}
      </div>
      <div class="container">
        {mode === DISPLAY &&
        <div>
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="searchbar" onChange={onKeywordChanged}></input>
          <button class="btn btn-outline-success" onClick={submitKeyword}>Search</button>
        </div>}
      </div>
      <section>
        {mode === DISPLAY && 
        <Display 
        user = {state.user}
        project = {state.project}
        projects={state.matchedProjects} 
        users = {state.users}
        // roomName = {state.roomName}
        pickAProject = {pickAProject}
        pickAUser = {pickAUser}
        createNewProject = {createNewProject}
        /> }
        {mode === MATCH && <MatchProject 
        user = {state.user}
        users = {state.users}
        project = {state.project}
        projects={state.projects}
        pickAProject = {pickAProject}
        pickAUser = {pickAUser}
        />}
        {mode === DETAIL && <ProjectDetail
        user = {state.user} 
        users = {state.users}
        project={state.project}
        projects={state.projects}  
        roomName = {state.roomName}
        pickAProject = {pickAProject}
        chatToAGroup = {chatToAGroup}
        pickAUser = {pickAUser}
        />}
        {mode === CHAT && <ChatRoom 
        user = {state.user}
        users = {state.users}
        project={state.project}
        projects={state.projects}
        roomName = {state.roomName}
        pickAUser = {pickAUser}
        />}
        {mode === PROFILE && <Profile
        user = {state.user}
        users = {state.users}
        project={state.project}
        projects={state.projects}
        pickAProject = {pickAProject}
        pickAUser = {pickAUser}
        />}
        {mode === REGISTER && <Register
        users = {state.users}
        // project={state.project}
        // projects={state.projects}
        // pickAProject = {pickAProject}
        // pickAUser = {pickAUser}
        setUsers={setUsers}
        pickSkills = {pickSkills}
        />}
        {mode === SKILLS && <Skills
        user = {state.user}
        // project={state.project}
        // projects={state.projects}
        // pickAProject = {pickAProject}
        pickAUser = {pickAUser}
        backToHome = {backToHome}
        />}
        {mode === CREATE && <CreateProject
        // user = {state.user}
        // project={state.project}
        // projects={state.projects}
        // pickAProject = {pickAProject}
        // pickAUser = {pickAUser}
        />}
      </section>

      <section>
        <h1>footer</h1>
      </section>
    </main>
  );
}

export default App;
