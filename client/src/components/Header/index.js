import React from "react";



export default function Header(props) {
return (
  <div>
  <div style={{height: "400px", backgroundImage: "linear-gradient(lightblue, white)", display: "flex", justifyContent: "center"}}>
    <h1 style={{alignSelf: "center"}}>Take Your Collaboration To The Next Level</h1>
  </div>
  <div style={{height: "100px", display: "flex", justifyContent: "center"}}>
    <div style={{display: "flex", flexFlow: "column wrap", alignItems: "center"}}>
      <h4>Welcome to CollabApp, the home base for free, open source collaboration.</h4>
      <h5>Discover projects to join, or share your vision by creating your own!</h5>
    </div>
  </div>
  </div>
)}