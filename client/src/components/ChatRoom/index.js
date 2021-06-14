import React from "react";
import Button from "../Button";
import ProjectList from "../ProjectList";
import useChat from "../../hooks/useChat";
import { findUserById } from "../../helpers/selectors";
import MentorRequest from "../MentorRequest";
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
  
  
  messages.map( msg => {
    const sender = findUserById(parseInt(msg.senderId), props.users)
    return msg.name = sender.firstName +" "+ sender.lastName
  })
  
  const roomMember = props.project.project_users

  

  // console.log("msg!!!!!!!!!!!!",messages)
  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room: {roomId}</h1>
      <h3>Talk to:</h3>
      {roomMember.map(member => (
        <p>{member.firstName} {member.lastName}</p>
      ))}
      <div className="messages-container">
        <ul className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            > {message.name}: 
              {message.body}
            </li>
          ))}
        </ul>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
      <div>
        <h2>{props.project.name}</h2>
        <h3 onClick={() => props.pickAUser(props)}>{props.project.lead}</h3>
        <p>{props.project.description}</p>
        <MentorRequest
          users={props.users}
        />
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
