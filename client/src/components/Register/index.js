import React from "react";
import Button from "../Button";
// import ProjectList from "../ProjectList";

export default function Register(props) {
  return (
    <article>
      
      <h2>--------------------Register-----------------</h2>
      
      <div>
        
      </div>
      <form onSubmit={event => event.preventDefault()}>please Register!
      <input></input>
      <Button onClick={()=>props.pickSkills}>Register</Button>
      </form>
      
      <div>
        

      </div>
    </article>
  );
}
