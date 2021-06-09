import React from "react";
import Button from "../Button";
import ProjectList from "../ProjectList";
import { findUserById } from "../../helpers/selectors";

export default function ChatRoom(props) {
  const messages = props.project.project_messages.map((msg, index) => {
    const user = findUserById(msg.UserId, props.users);

    return (
      <div>
        <img src={user.photo} alt={user.firstName} />
        <h5>
          {user.firstName} {user.lastName} :
        </h5>
        <p>{msg.message}</p>
      </div>
    );
  });

  return (
    <article>
      
      <div>
        <h1>------------------------chatBox---------------</h1>

        {messages}
      </div>
      <div>
        <h2>{props.project.name}</h2>
        <h3 onClick={() => props.pickAUser(props)}>{props.project.lead}</h3>
        <p>{props.project.description}</p>
      </div>
    </article>
  );
}
