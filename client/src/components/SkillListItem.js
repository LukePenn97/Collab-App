import React, {useState} from "react";
import Tooltip from '@material-ui/core/Tooltip';
// import "components/DayListItem.scss";

// const classnames = require('classnames');

export default function SkillListItem(props) {
  let isActive = props.activeSkills.includes(props.skill)

  const style = isActive ? { border: '1px solid #021a40' } : {};

  return (
    <Tooltip title={props.skillName} placement="top">
      <img style={style} onClick={() => {
        props.pickASkill(props.skill)
        }} width="50" height="50" src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${props.skillName.toLowerCase()}/${props.skillName.toLowerCase()}-original.svg`}/>
    </Tooltip>
  );
}
