import React from "react";
import SkillListItem from "./SkillListItem";

export default function SkillList(props) {
  // console.log("hi")
  // console.log(props.projects)
  const skillsData = [
    { value: 1, label: 'Javascript', isFixed: true },
    { value: 2, label: 'React', isFixed: true},
    { value: 3, label: 'Ruby', isFixed: true },
    { value: 4, label: 'PostgreSQL', isFixed: true },
    { value: 5, label: 'Express', isFixed: true },
  ];

  const skillList = skillsData.map((skill) => {
    return (
      <SkillListItem
        skill={skill.value}
        skillName={skill.label}
        activeSkills={props.skills}
        pickASkill={props.pickASkill}
      />
    );
  });

  return <div className="col">{skillList}</div>;
}
