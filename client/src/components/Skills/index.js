import React from "react";
import Button from "../Button";
// import ProjectList from "../ProjectList";

export default function Register(props) {
  return (
    <article>
      
      <h2>--------------------Skills-----------------</h2>
      
      <div>
        <h2>Pick your talent skills!</h2>
        <p>React</p>
        <p>Js</p>
        <p>CSS</p>
        <Button onClick = {props.backToHome}>Next</Button>
      </div>
    
      {/* <Button onClick={()=>props.pickSkills}>Register</Button>
      */}
      
      <div>
        

      </div>
    </article>
  );
}
