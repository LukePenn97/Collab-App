import React from "react";
// import Button from "../Button";
import ProjectList from "../ProjectList";

export default function Profile(props) {
  return (
    <article>
      <h1>Profile</h1>
      <h2>--------------------{props.user}-----------------</h2>
      <ProjectList 
    project={props.project} 
    projects={props.projects}
    pickAProject = {props.pickAProject}
    />
      <div>
        
      </div>
      <div>
        {/* <h2>{props.project.name}</h2> 
        <h3>{props.project.lead}</h3> 
        <p>{props.project.description}</p>  */}

        </div>
    </article>
  );
}
