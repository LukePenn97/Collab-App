import React from "react";
import { findUserById } from "../helpers/selectors"
// import "components/DayListItem.scss";

// const classnames = require('classnames');

export default function ProjectListItem(props) {
  // const itemClass = classnames("day-list__item", {
  //   "day-list__item--selected": props.selected, "day-list__item--full": props.spots === 0
  // })
  
 
  const projectLead = findUserById(props.projectLeadId, props.project_users);
  // console.log(projectLead)
  

  return (
    <li>
      <h2 onClick={() => props.pickAProject(props)}>{props.name}</h2>
      <h3 onClick={() => props.pickAUser(props.projectLeadId)}>
        {`${projectLead.firstName}  
        ${projectLead.lastName}`}
      </h3>
      <p>{props.description}</p>
      <p>{props.project_skills[0].name}</p>
      <img
      src={props.imgUrl}
      alt={props.name}
    />
    </li>
  );
}
