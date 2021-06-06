import React from "react";
// import Button from "../Button";
import ProjectList from "../ProjectList";


export default function MatchProject(props) {
return (
  <article>
    <h1>Project List page</h1>
    <ProjectList 
    projects={props.projects}
    pickAProject = {props.pickAProject}
    />
  </article>
)
} 