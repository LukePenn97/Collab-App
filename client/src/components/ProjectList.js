import React from "react";
import ProjectListItem from "./ProjectListItem"


export default function ProjectList(props) {
  // console.log("hi")
  // console.log(props.projects)

  const projects = props.projects.map((project,index) => {
    return (
      <ProjectListItem 
      key={index}
      name = {project.name}
      lead = {project.lead}
      description = {project.description}
      pickAProject = {props.pickAProject}
      />
    )
  })

  return(
    <ul>
      {projects}
    </ul>
  )
} 

