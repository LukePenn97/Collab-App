// import React from "react";
import React, { useState } from "react";
import Button from "../Button";
import Cookies from "universal-cookie";

const cookies = new Cookies();


export default function Login(props) {

  const [email, setEmail] = useState(props.email || "");
  const [password, setPassword] = useState(props.email || "");
  // Finding the user by email from the client side users and check the password
  const submitLogin = () => {
    const theUser = props.users.find(user => user.email === email);
    if(theUser !== "undefined" && theUser.password === password) {
      cookies.set("currentUser", theUser.id, { path: "/" });
      props.pickSkills();
    } else console.log("Please navigate to registeration page and register")

  };
  return (
    <article>
      <h2>--------------------Register-----------------</h2>

      <div>
        <input
          className="appointment__create-input text--semi-bold"
          name="email"
          type="text"
          value={email}
          placeholder={"Enter Email"}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <input
          className="appointment__create-input text--semi-bold"
          name="password"
          type="text"
          value={password}
          placeholder={"Enter password"}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <Button onClick={() => submitLogin()}>Log In</Button>

    </article>
  );
}
