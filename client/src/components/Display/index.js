import React from "react";
import Button from "../Button";
import ProjectList from "../ProjectList";


export default function Display(props) {
return (
  <article>
    <Button onClick ={props.onMatch}>find a group</Button>
    <Button>create a project</Button>
    <ProjectList 
    projects={props.projects}
    pickAProject = {props.pickAProject}
    />
  </article>
)} 