import React from "react";

// backgroundImage: "linear-gradient(#FF855C, #F5853F)"

export default function Header(props) {
return (
  <div style={{height: "400px", backgroundImage: "linear-gradient(to right, #FF855C, #F5853F)", color: "white", display: "flex", justifyContent: "center", flexFlow: "column wrap"}}>
    <h1 style={{alignSelf: "center", marginBottom: "50px"}}>Take Your Collaboration To The Next Level</h1>
    <h4 style={{alignSelf: "center"}}>Welcome to CollabApp, your home base for free, open source collaboration.</h4>
    <h5 style={{alignSelf: "center"}}>Discover projects to join, or share your vision by creating your own.</h5>
  </div>
)}