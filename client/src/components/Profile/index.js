import React from "react";
// import Button from "../Button";
import ProjectList from "../ProjectList";
import { findUserById, findAllById } from "../../helpers/selectors";

export default function Profile(props) {
  //find the data of the user by id
  const userToShow = findUserById(props.user, props.users);

  //find the projects created by the user
  const projectsToShow = findAllById(props.user, props.projects);

  return (
    <article>
      <h1>Profile</h1>
      <h2>
        -------------------- {`${userToShow.firstName} ${userToShow.lastName}`}
        -----------------
      </h2>
      <ProjectList
        project={props.project}
        projects={projectsToShow}
        pickAProject= {props.pickAProject}
      />
      <div></div>
      <div>
        {/* <h2>{props.project.name}</h2> 
        <h3>{props.project.lead}</h3> 
        <p>{props.project.description}</p>  */}
      </div>
    </article>
  );
}
