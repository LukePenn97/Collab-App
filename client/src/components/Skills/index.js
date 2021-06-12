import React, { useState } from "react";
import Button from "../Button";
// import ProjectList from "../ProjectList";
import Select from 'react-select';
import axios from 'axios';
import Cookies from "universal-cookie";

const cookies = new Cookies();
/**
 * The options array should contain objects.
 * Required keys are "name" and "value" but you can have and use any number of key/value pairs.
 */

const options = [
  { value: 1, label: 'Javascript', isFixed: true },
  { value: 2, label: 'React', isFixed: true},
  { value: 3, label: 'Ruby', isFixed: true },
  { value: 4, label: 'SQL', isFixed: true },
  { value: 5, label: 'Express', isFixed: true },
];




export default function Register(props) {
  const [skills, setSkills] = useState([]);

  const currentUser = cookies.get("currentUser");
  const submitSkills = (props) => {
    // console.log("SKILLS:",skills)
    const url = `http://localhost:5000/users/${currentUser}/skills`
    return axios.post(url, {"skills": skills})
      .then((body) => {
        // console.log("hiiii")
        // props.pickAUser(props.user)
        props.backToHome()
      })
  }

  const onSkillsChanged = (e) => {
    //console.log("e is:",e)
    // if (!e[e.length -1]) {
    //   return;
    // }
    const _skills = []
    for (const elem of e) {
      _skills.push(elem.value)
    }
    //setSkills(_skills)
    //console.log(_skills)
  }

  return (
    <article>

      <h2>--------------------Skills-----------------</h2>
      
      <div>
        <h2>Pick your talent skills!</h2>
          <Select
            // defaultValue={[colourOptions[2], colourOptions[3]]}
            onChange={onSkillsChanged}
            isMulti

            name="skills"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
          />
          <button onClick={() =>submitSkills(props)}>Submit</button>
      </div>
    
      {/* <Button onClick={()=>props.pickSkills}>Register</Button>
      */}
    
    </article>
  );
}
