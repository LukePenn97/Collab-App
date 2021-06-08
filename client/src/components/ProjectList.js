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
      projectLeadId = {project.projectLeadId}
      description = {project.description}
      project_users = {project.project_users}
      pickAProject = {props.pickAProject}
      pickAUser = {props.pickAUser}
      />
    )
  })

  return(
    <ul>
      {projects}
    </ul>
  )
} 

