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
import Login from "./Login";
import Skills from "./Skills";
import CreateProject from "./CreateProject";
import SkillList from "./SkillList";
import SearchBar from "./SearchBar";
import AutoMatch from "./AutoMatch";
import { filterProjectsBySkills } from "../helpers/selectors";

import useVisualMode from "../hooks/useVisualMode";
import useAppData from "../hooks/useAppData";



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
  const LOGIN = "LOGIN";
  const SKILLS = "SKILLS";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(DISPLAY);

  function backToHome() {
        transition(DISPLAY);
  }
  function reloadAllProjects(){
    return  axios.get("http://localhost:5000/projects")
      .then(body => {
        setState(prev => ({...prev, matchedProjects: body.data} ))
      })
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
  function login(){
    transition(LOGIN)
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
    transition(DISPLAY)
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
          <NavBar users={state.users} userId={cookies.get("currentUser")} backToHome={backToHome} registration={registration} login={login} createNewProject={createNewProject} autoMatch={autoMatch}/>
        </div>
      </section>
      <div className="container">
        {mode === DISPLAY &&
        <AutoMatch
            setState={setState}
            users={state.users}
            userId={cookies.get("currentUser")}
            skills={state.skills}
            projects={state.projects}
        />}
      </div>
      <div className="container">
        {mode === DISPLAY &&
        <SkillList
            pickASkill={skillFilter}
        />}
      </div>
      <div className="container">
        {mode === DISPLAY &&
        <SearchBar
          
          skills={state.skills}
          setState={setState}
        />}
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
        setState = {setState}
        setProjects ={setProjects}
        setProject ={setProject}
        />}
        {mode === CHAT && <ChatRoom
        user = {state.user}
        users = {state.users}
        currentUser = {state.user}
        project={state.project}
        projects={state.projects}
        roomName = {state.roomName}
        pickAUser = {pickAUser}
        setState = {setState}
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
        users = {state.users}
        // project={state.project}
        // projects={state.projects}
        // pickAProject = {pickAProject}
        // pickAUser = {pickAUser}
        setUsers={setUsers}
        pickSkills = {pickSkills}
        />}
        {mode === LOGIN && <Login
        users = {state.users}
        // project={state.project}
        // projects={state.projects}
        // pickAProject = {pickAProject}
        // pickAUser = {pickAUser}
        // setUsers={setUsers}
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
        setProjects={setProjects}
        projects={state.projects}
        pickAProject = {pickAProject}
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
