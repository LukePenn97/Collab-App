import React, {useState, useEffect} from "react";
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import "devicon/devicon.min.css"

export default function SkillListItem(props) {
  let isActive = props.activeSkills.includes(props.skill)
  const style = isActive ? { border: '1px solid #021a40' } : {};
  //console.log(`devicon-${props.skillName.toLowerCase()}-original`);
  return (
      <Box display="flex">
        <Tooltip title={props.skillName} placement="top">
          <i 
          style={{margin: "3px", fontSize: 40, ...style}} 
          className={props.iconClass}
          onClick={() => {props.pickASkill([props.skill], false)}}>
          </i>
        </Tooltip>
      </Box>
  );
}
