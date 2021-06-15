import React from "react";
import { findUserById } from "../../helpers/selectors";
import axios from "axios";
import { Container } from "./Container";



export default function ProjectInfo(props) {

//logic for goals
const goalToChange = props.project.project_goals;
// console.log("projectInState", goalToChange);

const handleOnChange = (position, goal) => {
  const changedGoalItem = {
    ...goal,
    completedAt: goal.completedAt ? null : new Date(),
  };

  goalToChange[position] = changedGoalItem;
  const changeProject = { ...props.project, project_goals: goalToChange };
  const projectToChange = props.project;
  const projectsToChange = props.projects;

  axios.patch(
    `http://localhost:5000/projects/${props.project.id}/${goal.id}`
  );
  console.log("change", changeProject.project_goals);
  console.log("state", props.project);
  console.log("projects", props.projects);

  props.setState((prev) => ({
    ...prev,
    project: projectToChange,
    projects: projectsToChange,
  }));
};

//logic for pop up form
const triggerText = "Add Goal";
const onSubmit = (event) => {
  event.preventDefault(event);
  return axios
    .post(`http://localhost:5000/projects/${props.project.id}/addGoal`, {
      name: event.target.name.value,
      description: event.target.description.value,
      startDate: event.target.startDate.value,
      deadline: event.target.deadline.value,
    })
    .then((body) => {
      const goalsBeforeUpdate = props.project.project_goals;
      goalsBeforeUpdate.push(body.data);
      const projectWithNewGoal = {
        ...props.project,
        project_goals: goalsBeforeUpdate,
      };
      const projectsWithNewGoal = props.projects;
      props.setState((prev) => ({
        ...prev,
        project: projectWithNewGoal,
        projects: projectsWithNewGoal,
      }));
    });
};

return (
  <section>
    <div className="projectInfo">
        <h2>{props.project.name}</h2>
        <h3 onClick={() => props.pickAUser(props)}>{props.project.lead}</h3>
        {/* <p>{props.project.description}</p>
        <MentorRequest users={props.users} /> */}
      </div>
      <div>
      
      </div>
      <div className="App">
        <ul className="toppings-list">
          {props.project.project_goals &&
            props.project.project_goals.map((goal, index) => {
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
                        onChange={() => handleOnChange(index, goal)}
                      />
                      <label htmlFor={`custom-checkbox-${index}`}>
                        {goal.name}
                      </label>
                    </div>
                    <div className="right-section">{goal.description}</div>
                    <div>deadline: {goal.deadline} </div>
                    <div>
                      {goal.completedAt ? (
                        <div>
                          <span>completed at: </span>
                          <p>{JSON.stringify(goal.completedAt)}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
        <div>
          <Container triggerText={triggerText} onSubmit={onSubmit} />
        </div>
      </div>
  </section>
)

}