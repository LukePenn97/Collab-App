import React, { useState } from "react";
import Button from "../Button";
import { findUserById } from "../../helpers/selectors";
import axios from "axios";
// import { Container } from './Container';
// import './index.css'


export default function ProjectDetail(props) {
  const projectLead = findUserById(props.project.projectLeadId, props.users);

  // const goalToChange = props.project.project_goals;
  // console.log("projectInState",goalToChange)
  
    
  //   const handleOnChange = (position,goal) => {
      
  //     const changedGoalItem = {...goal, completedAt: goal.completedAt? null : new Date()}
      
  //   goalToChange[position] = changedGoalItem;
  //    const changeProject = {...props.project, project_goals:goalToChange}
  //    const projectToChange = props.project;
  //    const projectsToChange = props.projects;
     
  //    axios.patch(`http://localhost:5000/projects/${props.project.id}/${goal.id}`);
  //    console.log("change",changeProject.project_goals);
  //    console.log("state",props.project)
  //    console.log("projects",props.projects)
     
  //   props.setState(prev => ({...prev, project:projectToChange, projects: projectsToChange}));
  // };


  // const triggerText = 'Add Goal';
  // const onSubmit = (event) => {
  //   event.preventDefault(event);
  //   // console.log(event.target.name.value);
  //   // console.log(event.target.email.value);
  // return  axios.post(`http://localhost:5000/projects/${props.project.id}/addGoal`,{
  //     name:event.target.name.value,
  //     description:event.target.description.value,
  //     startDate:event.target.startDate.value,
  //     deadline:event.target.deadline.value,
  //   }).then((body) => {
  //     const goalsBeforeUpdate = props.project.project_goals;
  //     goalsBeforeUpdate.push(body.data);
  //     const projectWithNewGoal = {...props.project, project_goals: goalsBeforeUpdate};
  //     const projectsWithNewGoal = props.projects;
  //     props.setState(prev => ({...prev,project:projectWithNewGoal,projects:projectsWithNewGoal}));
  //   })
  // };
 

  return (
    <article>
      <h1>---------------Project Detail page----------------</h1>
      <h2>{props.project.name}</h2>
      <h3 onClick={() => props.pickAUser(props.project.projectLeadId)}>
        {`${projectLead.firstName}
        ${projectLead.lastName}`}
      </h3>
      <p>{props.project.description} </p>
      <img
      src={props.project.imgUrl}
      alt={props.project.name}
    />
      <Button onClick={()=>props.chatToAGroup(props.project.id)}>chatRoom</Button>
      {/* <div>
      <h2>-------------------------Goals-----------------------</h2>

      </div>
      <div className="App">
      <h3>Select Toppings</h3>
      <ul className="toppings-list">
        {props.project.project_goals && props.project.project_goals.map((goal, index) => {
          return (
            <li key={index}>
              <div className="toppings-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={goal.name}
                    value={goal.name}
                    checked={goal.completedAt}
                    onChange={() => handleOnChange(index,goal)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{goal.name}</label>
                </div>
                <div className="right-section">{goal.description}</div> 
                <div>deadline: {goal.deadline} </div>
                <div>{goal.completedAt? (
                  <div>
                <span>completed at: </span> 
                <p>{JSON.stringify(goal.completedAt)}</p> 
               </div>
                ):(
                  null)}
                  </div>
              </div>
            </li>
          )})}
      </ul>
        <div>
        <Container triggerText={triggerText} onSubmit={onSubmit} />
        </div>
    </div> */}
  


    </article>
  );
}
{
  /* <h2 onClick={() => props.pickAProject(props)}>{props.name}</h2>
      <h3 onClick={() => props.pickAUser(props.user)}>
        {`${projectLead.firstName}
        ${projectLead.lastName}`}
      </h3> */
}
