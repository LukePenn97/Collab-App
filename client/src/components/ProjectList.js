import React from "react";
import ProjectListItem from "./ProjectListItem";

export default function ProjectList(props) {

  const projects = props.projects.slice(0,10).map((project, index) => {

    return (
      <ProjectListItem
        key={index}
        project={project}
        pickAProject={props.pickAProject}
        pickAUser={props.pickAUser}
      />
    );
  });

  return <ul>{projects}</ul>;
}
