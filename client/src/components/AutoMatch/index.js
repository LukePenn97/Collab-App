import React, {useState} from "react";
import { filterProjectsBySkills, findUserById } from "../../helpers/selectors";
import Button from "@material-ui/core/Button";

export const getTheme = muiBaseTheme => ({
  MuiButton: {
    root: {
      "&.MuiButton--shinning": {
        position: "relative",
        paddingLeft: 16,
        paddingRight: 16,
        background:
          "linear-gradient(to right, #aea0d5, #eaafc8)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
        "&:after": {
          content: '" "',
          borderRadius: muiBaseTheme.shape.borderRadius,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          boxShadow: "0 0 20px 0 #f5005780",
          animation: "mui-ripple-pulsate 1s infinite",
          zIndex: -1
        }
      }
    },
    label: {
      color: muiBaseTheme.palette.common.white,
      textTransform: "none",
      fontSize: 15,
      fontWeight: 700
    },
    contained: {
      minHeight: 30,
      boxShadow: muiBaseTheme.shadows[0],
      "&$focusVisible": { boxShadow: muiBaseTheme.shadows[0] },
      "&:active": { boxShadow: muiBaseTheme.shadows[0] },
      "&$disabled": { boxShadow: muiBaseTheme.shadows[0] }
    }
  },
  "@keyframes mui-shine": {
    "0%": { transform: "scale(1)", opacity: 1 },
    "100%": { transform: "scale(1.5)", opacity: 0 }
  }
});


const AutoMatch = (props) => {

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
    <Button className={"MuiButton--shinning"} onClick={()=>autoMatch(currentUserSkills)}>AutoMatch</Button>
    
  )
}
AutoMatch.getTheme = getTheme;
AutoMatch.displayName = "Button";
AutoMatch.metadata = {
  name: "Shinning",
  description: "I love to be shinned"
};

export default AutoMatch;