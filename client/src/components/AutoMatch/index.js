import React, {useState} from "react";
import { filterProjectsBySkills, findUserById } from "../../helpers/selectors";

export default function AutoMatch(props) {

  let thisUser = findUserById(1, props.users)
  console.log("USER IN AUTOMATCH:", thisUser)
  let currentUserSkills;
  if (thisUser) {
    currentUserSkills = thisUser.user_skills.map((skill)=>{return skill.id})
    console.log("currentUserSkills", currentUserSkills, "props.skills:", props.skills)
    
  }
  
  function autoMatch(skills) {
    console.log("skills", skills, "currentUserSkills", currentUserSkills, "props.skills:", props.skills)
    props.skillFilter(skills, true);
  }

  return (
    <button style={{width: "200px", height: "75px", margin: "25px"}}className="btn btn-outline-success" onClick={()=>autoMatch(currentUserSkills)}>AutoMatch</button>
  )
}