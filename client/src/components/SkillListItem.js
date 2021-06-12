import React from "react";
// import "components/DayListItem.scss";

// const classnames = require('classnames');

export default function SkillListItem(props) {

  return (
    <div className="col-sm" onClick={() => props.pickASkill(props.skill)}>{props.skillName}</div>
  );
}
