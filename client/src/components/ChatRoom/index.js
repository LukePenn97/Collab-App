import React from "react";
import Button from "../Button";
import ProjectList from "../ProjectList";
import useChat from "../../hooks/useChat";
import { findUserById } from "../../helpers/selectors";
import MentorRequest from "../MentorRequest";
import axios from "axios";
import { Container } from "./Container";


import "./index.css";
import "./chatBox.scss";

export default function ChatRoom(props) {
  // const messages = props.project.project_messages.map((msg, index) => {
  //   const user = findUserById(msg.UserId, props.users);

  //   return (
  //     <div>
  //       <img src={user.photo} alt={user.firstName} />
  //       <h5>
  //         {user.firstName} {user.lastName} :
  //       </h5>
  //       <p>{msg.message}</p>
  //     </div>
  //   );
  // });
  //TODO: button to submit request to join in a group
  const { roomId } = props.roomName;
  const { messages, sendMessage } = useChat(roomId);
  // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(""); // Message to be sent

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
    //   };
  };
  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  messages.map((msg) => {
    const sender = findUserById(parseInt(msg.senderId), props.users);
    return (msg.name = sender.firstName + " " + sender.lastName);
  });

  const roomMember = props.project.project_users;

  //logic for goals
  const goalToChange = props.project.project_goals;
  console.log("projectInState", goalToChange);

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
    // console.log(event.target.name.value);
    // console.log(event.target.email.value);
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

  // console.log("msg!!!!!!!!!!!!",messages)
  return (
    <div className="chat-room-container">
      <section className = "wrapper">
        <h1 className="room-name">Room: {roomId}</h1>
        <h3>Talk to:</h3>
        {roomMember.map((member) => (
          <p>
            {member.firstName} {member.lastName}
          </p>
        ))}
        <div className="messages-container inner" >
          <ul className="messages-list content">
            {messages.map((message, i) => (
              <li
                key={i}
                className={`message-item ${
                  message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}
              >
          
                {message.name}:{message.body}
              </li>
            ))}
          </ul>
        </div>
        <div className = "bottom">
        <textarea
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Write message..."
          className="new-message-input-field input"
        />
        <button onClick={handleSendMessage} className="send-message-button send">
        
        </button>
        </div>
      </section>
      ----------------------------
      <div>
        <h2>{props.project.name}</h2>
        <h3 onClick={() => props.pickAUser(props)}>{props.project.lead}</h3>
        <p>{props.project.description}</p>
        <MentorRequest users={props.users} />
      </div>
      <div>
        <h2>-------------------------Goals-----------------------</h2>
      </div>
      <div className="App">
        <h3>Select Toppings</h3>
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
    </div>
  );
}

// return (
//   <article>
//     <div>
//       <h1>------------------------chatBox---------------</h1>

//       {/* {messages} */}
//     </div>
//     <div>
//       <h2>{props.project.name}</h2>
//       <h3 onClick={() => props.pickAUser(props)}>{props.project.lead}</h3>
//       <p>{props.project.description}</p>
//     </div>
//   </article>
// );
