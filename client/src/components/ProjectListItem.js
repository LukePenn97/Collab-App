import React from "react";
import { findUserById } from "../helpers/selectors"
import Tooltip from '@material-ui/core/Tooltip';

export default function ProjectListItem(props) {
 
  const projectLead = findUserById(props.projectLeadId, props.users);

  const skills = [];
  props.project_skills.map(skill => skills.push(skill.name))
  const icons = props.project_skills.map(skill => {
    return (
      // <Box display="flex">
      <Tooltip title={skill.name} placement="top">
        <i 
        style={{fontSize: 40}} 
        className={skill.iconClass}
        >
        </i>
      </Tooltip>
    )
  })

  return (
    <li>
      <h2 onClick={() => props.pickAProject(props)}>{props.name}</h2>
      <h3 onClick={() => props.pickAUser(props.projectLeadId)}>
        {`${projectLead.firstName}  
        ${projectLead.lastName}`}
      </h3>
      <div>
        {icons}
      </div>
      <p>{props.description}</p>
      <p>{props.project_skills[0].name}</p>
      <img
      src={props.imgUrl}
      alt={props.name}
    />
    </li>
  );
}
