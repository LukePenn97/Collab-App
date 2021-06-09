import React from "react";
import Button from "../Button";
import { findUserById } from "../../helpers/selectors";


export default function ProjectDetail(props) {
  const projectLead = findUserById(props.project.projectLeadId, props.project.project_users);

  // const projectMembers = 

  return (
    <article>
      <h1>---------------Project Detail page----------------</h1>
      <h2>{props.project.name}</h2>
      <h3 onClick={() => props.pickAUser(props.project.projectLeadId)}>
        {`${projectLead.firstName}  
        ${projectLead.lastName}`}
      </h3>
      <p>{props.project.description} </p>
      <img
      src={props.project.imgUrl}
      alt={props.project.name}
    />
      <Button onClick={()=>props.chatToAGroup(props.project.id)}>chatRoom</Button>
    </article>
  );
}
{
  /* <h2 onClick={() => props.pickAProject(props)}>{props.name}</h2>
      <h3 onClick={() => props.pickAUser(props.user)}>
        {`${projectLead.firstName}  
        ${projectLead.lastName}`}
      </h3> */
}
