import React from "react";
import ProjectInfo from "./ProjectInfo";
import useChat from "../../hooks/useChat";
import { findUserById } from "../../helpers/selectors";
import MentorRequest from "../MentorRequest";
import Typography from "@material-ui/core/Typography";


import "./goal.css";
import "./chatBox.scss";
import "./index.scss";
import Cookies from "universal-cookie";

//card
import JssProvider from "react-jss/lib/JssProvider";
import { createGenerateClassName } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const muiBaseTheme = createMuiTheme();

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true
});

const cookies = new Cookies();

export default function ChatRoom(props) {
  
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
  const currentUser = cookies.get("currentUser");
  const roomTalkers = [...roomMember];
  roomTalkers.push(props.users.find((ele) => ele.id === parseInt(currentUser)));
  

  
  return (
    <div className="main-box">
      <section className="wrapper chatBox">
        <div className="nav" id="nav">
          <div className="default-nav">
            <div className="main-nav">

              {roomMember.map((member) => (
                <div className="toggle">
                  <img src={member.photo} className="main-nav-item"></img>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="inner" id="inner">
          <div className="chatContent" id="chatContent">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`message-wrapper ${
                  message.senderId === currentUser ? "me" : "them"
                }`}
              >
                <div className="circle-wrapper animated bounceIn">
                  <img
                    className="circle-wrapper"
                    src={
                      roomTalkers.find(
                        (ele) => ele.id === parseInt(message.senderId)
                      ).photo
                    }
                  ></img>
                </div>
                <div className="text-wrapper animated fadeIn">
                  {message.body}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bottom">
          <textarea
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="Write message..."
            className="new-message-input-field input"
          />
          <button
            onClick={handleSendMessage}
            className="send-message-button send"
          ></button>
        </div>
      </section>
      <div style={{position: "fixed", display: "block", marginTop: "650px", left: "350px" }}>
        <MentorRequest
        users={props.users}
        allSkills={props.allSkills}
        />
      </div>

<div className="sideBar">
<JssProvider generateClassName={generateClassName}>
      <MuiThemeProvider
        theme={createMuiTheme({
          typography: {
            useNextVariants: true
          },
          overrides: ProjectInfo.getTheme(muiBaseTheme)
        })}
      >
       
       
        <ProjectInfo 
         users={props.users}
         project={props.project}
         projects={props.projects}
         setState={props.setState}
         pickAUser={props.pickAUser}
        />
      </MuiThemeProvider>
    </JssProvider>
      </div>
      
    </div>
    
  );
}


