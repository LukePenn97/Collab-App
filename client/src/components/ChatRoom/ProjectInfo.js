import React from "react";
import { findUserById } from "../../helpers/selectors";
import axios from "axios";
import { Container } from "./Container";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

const ProjectInfo = (props) => {
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

 const projectLead = findUserById(props.project.projectLeadId,props.users);

  //logic for pop up form
  const triggerText = "Add";
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
      <Card className={"MuiEngagementCard--01"}>
        <CardMedia
          className={"MuiCardMedia-root"}
          image={props.project.imgUrl}
          />
          {console.log(props.project.imgUrl)}
        <CardContent className={"MuiCardContent-root"}>
          <div className="projectInfo">
            <Typography
              className={"MuiTypography--heading"}
              variant={"h5"}
              gutterBottom
            >
              {props.project.name}
            </Typography>
            <Typography
              className={"MuiTypography--heading"}
              variant={"h6"}
              onClick={() => props.pickAUser(props.project.projectLeadId)}
            >
              {projectLead.firstName+" "+projectLead.lastName}
            </Typography>

            <Typography className={"MuiTypography--subheading"} variant={"h6"}>
              {props.project.description}
            </Typography>
            <Divider className={"MuiDivider-root"} light />
            {props.project.project_users.map((user) => (
              <Avatar
                className={"MuiAvatar-root"}
                key={user.id}
                src={user.photo}
                onClick={() => props.pickAUser(user.id)}
              />
            ))}
          </div>

          <div className="App">
            <div className="toppings-list">
            <Typography className={"MuiTypography--subheading"} variant={"h6"}>
            Project Goals:
            </Typography>
              {props.project.project_goals &&
                props.project.project_goals.map((goal, index) => {
                  return (
                    <div key={index} className = "MuiEngagementCard--01">
                      <div className="toppings-list-item">
                        <div className="left-section">
                          <Checkbox
                            inputProps={{ "aria-label": "primary checkbox" }}
                            id={`custom-checkbox-${index}`}
                            name={goal.name}
                            value={goal.name}
                            checked={goal.completedAt}
                            onChange={() => handleOnChange(index, goal)}
                            className={""}
                          />
                          {/* <label htmlFor={`custom-checkbox-${index}`}> */}
                            <Typography variant="body1" gutterBottom className={"MuiTypography--subheading"}>
                              {goal.name}
                            </Typography>
                          {/* </label> */}
                        <Typography variant="body1" gutterBottom className={"MuiTypography--subheading"}>
                          {goal.description}
                        </Typography>
                        <Typography variant="body1" gutterBottom className={"MuiTypography--subheading"}>
                          deadline: {goal.deadline}
                        </Typography>

                        <div>
                          {goal.completedAt ? (
                            <Typography variant="body1" gutterBottom className={"MuiTypography--subheading"}>
                            completed at: {JSON.stringify(goal.completedAt)}
                          </Typography>
    
    ) : null}
                        </div>
                      </div>
    </div>
                    </div>
                  );
                })}
            </div>
            <div>
              <Container triggerText={triggerText} onSubmit={onSubmit} />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

ProjectInfo.getTheme = (muiBaseTheme) => ({
  MuiCard: {
    root: {
      "&.MuiEngagementCard--01": {
        transition: "0.3s",
        maxWidth: 560,
        margin: "auto",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
          boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
        },
        "& .MuiCardMedia-root": {
          paddingTop: "25%",
        },
        "& .MuiCardContent-root": {
          textAlign: "left",
          padding: muiBaseTheme.spacing.unit * 3,
        },
        "& .MuiDivider-root": {
          margin: `${muiBaseTheme.spacing.unit * 3}px 0`,
        },
        "& .MuiTypography--heading": {
          fontWeight: "bold",
        },
        "& .MuiTypography--subheading": {
          lineHeight: 1.8,
          marginLeft:muiBaseTheme.spacing.unit
        },
        "& .MuiAvatar-root": {
          display: "inline-block",
          border: "2px solid white",
          "&:not(:first-of-type)": {
            marginLeft: -muiBaseTheme.spacing.unit,
          },
        },
      },
    },
  },
});
ProjectInfo.displayName = "Card";

export default ProjectInfo;