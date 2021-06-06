import React from "react";
// import { useState, useEffect } from "react";
// import "./App.css";

import Display from "./Display";
import MatchProject from "./MatchProject";
import ProjectDetail from "./ProjectDetail";
import Button from "./Button";
import ChatRoom from "./ChatRoom";
import Profile from "./Profile";
import Register from "./Register";

import useVisualMode from "../hooks/useVisualMode";
import useAppData from "../hooks/useAppData";


function App() {
  //set the initial state 
  const {
    state,
    setProject,
    setProjects,
    setUser
  } = useAppData();

  

  //set the projects state to the hard code data
  // const [projects, setProjects] = useState(props.interviewer || null);
// setProjects(fakeProjects)


 
  const DISPLAY = "DISPLAY";
  const MATCH = "MATCH";
  const DETAIL = "DETAIL";
  const CHAT = "CHAT";
  const PROFILE = "PROFILE";
  const REGISTER = "REGISTER";
  const SKILLS = "SKILLS";
  const { mode, transition, back } = useVisualMode(DISPLAY);
  

  function onMatch() {
    transition(MATCH);
  }
  function backToHome() {
    transition(DISPLAY);
  }
  function pickAProject(project){
    setProject(project)
    transition(DETAIL)
  }
  function pickAUser(user){
    setUser(user)
    transition(PROFILE)
  }
  function chatToAGroup(){
    transition(CHAT)
  }
  function registration(){
    transition(REGISTER)
  }
  function pickSkills(){
    transition(SKILLS)
  }

  return (
    <main>
      <section>
        <div>
          <h2>navbar</h2>
          <Button onClick={backToHome}>home</Button>
          <Button onClick={registration}>Register</Button>
        </div>
      </section>

      <section>
        {mode === DISPLAY && <Display 
        user = {state.user}
        project = {state.project}
        projects={state.projects} 
        onMatch={onMatch} 
        pickAProject = {pickAProject}
        pickAUser = {pickAUser}
        />}
        {mode === MATCH && <MatchProject 
        user = {state.user}
        project = {state.project}
        projects={state.projects.slice(1)} 
        pickAProject = {pickAProject}
        pickAUser = {pickAUser}
        />}
        {mode === DETAIL && <ProjectDetail
        user = {state.user} 
        project={state.project}
        projects={state.projects}  
        pickAProject = {pickAProject}
        chatToAGroup = {chatToAGroup}
        pickAUser = {pickAUser}
        />}
        {mode === CHAT && <ChatRoom 
        user = {state.user}
        project={state.project}
        projects={state.projects}
        pickAUser = {pickAUser}
        />}
        {mode === PROFILE && <Profile
        user = {state.user}
        project={state.project}
        projects={state.projects}
        pickAProject = {pickAProject}
        pickAUser = {pickAUser}
        />}
        {mode === REGISTER && <Register
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
