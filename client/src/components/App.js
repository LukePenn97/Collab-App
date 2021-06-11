import React from "react";
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
import SearchBar from "./SearchBar";
import { filterProjectsBySkills } from "../helpers/selectors";

import useVisualMode from "../hooks/useVisualMode";
import useAppData from "../hooks/useAppData";
import StateManager from "react-select";

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

  function getProjectsByUserSkills(id){
    const url = `http://localhost:5000/users/${id}/match`
    Promise.all([
      axios.get(url)
    ]).then((all) => {
        console.log(all[0].data);

        setProjects(all[0].data)
        let filteredProjects = filterProjectsBySkills(state.skills, all[0].data)
        setMatchedProjects(filteredProjects)
        console.log("FILTERED:",filteredProjects)
      })
  }

  function onMatch() {
    const currentUser =  cookies.get("currentUser");
    getProjectsByUserSkills(currentUser)
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
    if (state.skills.includes(skill)) {
      console.log(`${skill} exists in skills`)
      let index = state.skills.indexOf(skill)
      state.skills.splice(index, 1)
    } else {
      state.skills.push(skill)
    }
    console.log("state.projects before filter:", state.projects)
    let filteredProjects = filterProjectsBySkills(state.skills, state.projects)
    console.log(filteredProjects)
    setMatchedProjects(filteredProjects)
    console.log("Skills",state.skills)
  }


  return (
    <main>
      <section>
        <div>
          <NavBar backToHome={backToHome} registration={registration} createNewProject={createNewProject} onMatch={onMatch} setProjects={setProjects}/>
        </div>
      </section>
      <div class="container">
        <SkillList
            pickASkill={skillFilter}
        />
      </div>
      <div class="container">
        <SearchBar

            setProjects={setProjects}
            setMatchedProjects={setMatchedProjects}
            filterProjectsBySkills={filterProjectsBySkills}
            skills={()=>state.skills}
            projects={state.projects}
        />
      </div>
      <section>
        {mode === DISPLAY && 
        <Display 
        user = {state.user}
        currentUser = {state.user}
        project = {state.project}
        projects={state.matchedProjects} 
        users = {state.users}
        // roomName = {state.roomName}
        onMatch={onMatch} 
        pickAProject = {pickAProject}
        pickAUser = {pickAUser}
        createNewProject = {createNewProject}
        /> }
        {mode === MATCH && <MatchProject 
        user = {state.user}
        users = {state.users}
        currentUser = {state.user}
        project = {state.project}
        projects={state.matchProjects}
        pickAProject = {pickAProject}
        pickAUser = {pickAUser}
        />}
        {mode === DETAIL && <ProjectDetail
        user = {state.user} 
        users = {state.users}
        currentUser = {state.user}
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
        currentUser = {state.user}
        project={state.project}
        projects={state.projects}
        roomName = {state.roomName}
        pickAUser = {pickAUser}
        />}
        {mode === PROFILE && <Profile
        user = {state.user}
        users = {state.users}
        currentUser = {state.user}
        project={state.project}
        projects={state.projects}
        pickAProject = {pickAProject}
        pickAUser = {pickAUser}
        />}
        {mode === REGISTER && <Register
        // users = {state.users}
        // project={state.project}
        // projects={state.projects}
        // pickAProject = {pickAProject}
        // pickAUser = {pickAUser}
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
