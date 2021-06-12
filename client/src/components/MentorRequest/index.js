import React from "react";
import { findMentors, getUserSkillsArray } from "../../helpers/selectors";


export default function MentorRequest(props) {

  const mentors = findMentors(props.users).map((mentor)=>{
    return(<div>
      <p>{mentor.firstName} {mentor.lastName}</p>
      {getUserSkillsArray(mentor.user_skills).map((skill)=>{
        return (<h2>{skill}</h2>)
      })}
      </div>)
  })
  return (
    <article>
      Mentor Request
      {mentors}
    </article>
  );
}
