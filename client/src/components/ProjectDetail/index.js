import React from "react";
import Button from "../Button";



export default function ProjectDetail(props) {
return (
  <article>
    <h1>Project Detail page</h1>
    <h2>{props.project.name}</h2>
    <h3>{props.project.lead}</h3>
    <p>{props.project.description} </p>
    <Button>chatRoom</Button>
  </article>
)
} 