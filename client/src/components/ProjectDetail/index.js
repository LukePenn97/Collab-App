import React from "react";
import Button from "../Button";
import { findTheLead } from "../../helpers/selectors";


export default function ProjectDetail(props) {
  const projectLead = findTheLead(props.project.projectLeadId, props.project.project_users);

  return (
    <article>
      <h1>---------------Project Detail page----------------</h1>
      <h2>{props.project.name}</h2>
      <h3 onClick={() => props.pickAUser(props.project.projectLeadId)}>
        {`${projectLead.firstName}  
        ${projectLead.lastName}`}
      </h3>
      <p>{props.project.description} </p>
      <Button onClick={props.chatToAGroup}>chatRoom</Button>
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
