import React from "react";
import Button from "../Button";
import ProjectList from "../ProjectList";

export default function ChatRoom(props) {
  return (
    <article>
      {/* <ProjectList 
    project={state.project} 
    projects={props.projects}
    pickAProject = {props.pickAProject}
    /> */}
      <div>
        <h1>------------------------chatBox---------------</h1>
        <p>blahblahblahblahblahblah</p>
        <p> blahblahblahblahblahblahblah</p>
        <p>blahblahblah</p>
        <p> blahblahblahblahblahblahblah</p>
        <p> blahblahblahblahblahblahblahblah</p>
        <p>blahblahblahblahblahblahblahblah</p>
        <p>blahblahblahblah</p>
      </div>
      <div>
        <h2>{props.project.name}</h2> 
        <h3 onClick ={()=> props.pickAUser(props)}>{props.project.lead}</h3> 
        <p>{props.project.description}</p> 

        </div>
    </article>
  );
}
