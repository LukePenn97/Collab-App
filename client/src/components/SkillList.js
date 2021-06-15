import React from "react";
import SkillListItem from "./SkillListItem";
import Box from '@material-ui/core/Box';
export default function SkillList(props) {

  const skillsData = props.allSkills.map((skill)=>{
    return {value: skill.id, label: skill.name, iconClass: skill.iconClass, isFixed: true}
  })

  const skillList = skillsData.map((skill) => {
    return (
      <SkillListItem
        iconClass={skill.iconClass}
        skill={skill.value}
        skillName={skill.label}
        activeSkills={props.skills}
        pickASkill={props.pickASkill}
      />
    );
  });

  return <Box width="170px" display="flex" flexWrap="wrap">{skillList}</Box>;
}
