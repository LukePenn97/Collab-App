import React, {useState, useEffect} from "react";
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import "devicon/devicon.min.css"

export default function SkillListItem(props) {
  let isActive = props.activeSkills.includes(props.skill)
  const style = isActive ? { padding: "3px", border: '2px solid green', borderRadius: "5px" } : {margin: "5px"};
  //console.log(`devicon-${props.skillName.toLowerCase()}-original`);
  return (
      <Box display="flex" className="skillIcon" onClick={() => {props.pickASkill([props.skill], false)}}>
        <Tooltip title={<h1 style={{fontSize: 25}}>{props.skillName}</h1>} placement="top">
          <i 
          style={{fontSize: 40, ...style}} 
          className={props.iconClass}
          >
          </i>
        </Tooltip>
      </Box>
  );
}
