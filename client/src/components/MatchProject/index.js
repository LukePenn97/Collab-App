import React from "react";
// import Button from "../Button";
import ProjectList from "../ProjectList";


export default function Display(props) {
return (
  <article>
    <h1>Project page</h1>
    <ProjectList projects={props.projects}/>
  </article>
)
} 