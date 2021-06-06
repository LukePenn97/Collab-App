import React from "react";
// import { useState, useEffect } from "react";
// import "./App.css";

import Display from "./Display";
import MatchProject from "./MatchProject";
import ProjectDetail from "./ProjectDetail";
import Button from "./Button";
import ChatRoom from "./ChatRoom";

import useVisualMode from "../hooks/useVisualMode";
import useAppData from "../hooks/useAppData";


function App() {
  //set the initial state 
  const {
    state,
    setProject,
    setProjects
  } = useAppData();

  

  //set the projects state to the hard code data
  // const [projects, setProjects] = useState(props.interviewer || null);
// setProjects(fakeProjects)


 
  const DISPLAY = "DISPLAY";
  const MATCH = "MATCH";
  const DETAIL = "DETAIL";
  const CHAT = "CHAT";
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
  function chatToAGroup(){
    transition(CHAT)
  }

  return (
    <main>
      <section>
        <div>
          <h2>navbar</h2>
          <Button onClick={backToHome}>home</Button>
        </div>
      </section>

      <section>
        {mode === DISPLAY && <Display 
        project = {state.project}
        projects={state.projects} 
        onMatch={onMatch} 
        pickAProject = {pickAProject}
        />}
        {mode === MATCH && <MatchProject 
        project = {state.project}
        projects={state.projects.slice(1)} 
        pickAProject = {pickAProject}
        />}
        {mode === DETAIL && <ProjectDetail 
        project={state.project}
        projects={state.projects}  
        pickAProject = {pickAProject}
        chatToAGroup = {chatToAGroup}
        />}
        {mode === CHAT && <ChatRoom 
        project={state.project}
        projects={state.projects}
        />}
      </section>

      <section>
        <h1>footer</h1>
      </section>
    </main>
  );
}

export default App;
