import React from "react";
import Button from "../Button";
import ProjectList from "../ProjectList";
import useChat from "../../hooks/useChat";
import { findUserById } from "../../helpers/selectors";

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

  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room: {roomId}</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {message.body}
            </li>
          ))}
        </ol>
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
