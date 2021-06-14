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
  function skillFilter(skill) {
    let newSkills;
    if (props.skills.includes(skill)) {
      let index = props.skills.indexOf(skill)
      newSkills = props.skills
      newSkills.splice(index, 1)
    } else {
      newSkills = [...props.skills, skill]
    }
    let filteredProjects = filterProjectsBySkills(newSkills, props.projects)
    console.log("newSkills in skillFilter",newSkills)
    //console.log("filteredProjects in skillFilter",filteredProjects)
    props.setState(prev=>({...prev, skills: newSkills, matchedProjects: filteredProjects}))
  }

  function autoMatch(skills) {
    for (const skill of skills) {
      skillFilter(skill);
    }
  }

  return (
    <button onClick={()=>autoMatch(currentUserSkills)}>AutoMatch</button>
  )
}