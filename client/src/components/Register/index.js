// import React from "react";
import React, { useState } from "react";
import axios from 'axios'

import Button from "../Button";
// import ProjectList from "../ProjectList";

export default function Register(props) {
  const [firstName, setFirstName] = useState(props.firstName || "");
  const [lastName, setLastName] = useState(props.lastName || "");
  const [email, setEmail] = useState(props.email || "");
  const [password, setPassword] = useState(props.email || "");



  const submitRegister = () => {
    // console.log("hiiiiii")
    const url = `http://localhost:5000/register`
    return axios.post(url, {"firstName": firstName, 'lastName': lastName, 'email':email ,'password':password})
      .then((body) => {
        // console.log("hiiii")
        console.log(body)
        // props.pickAUser(body.id)
        props.pickSkills()
      })
    // console.log(firstName,lastName,email,password)
    // props.pickSkills();
  };
  return (
    <article>
      <h2>--------------------Register-----------------</h2>

      <div>
        <input
          className="appointment__create-input text--semi-bold"
          name="firstName"
          type="text"
          value={firstName}
          placeholder={"Enter First Name"}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </div>
      <div>
        <input
          className="appointment__create-input text--semi-bold"
          name="lastName"
          type="text"
          value={lastName}
          placeholder={"Enter Last Name"}
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>
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

      <Button onClick={() => submitRegister()}>Register</Button>

      <div></div>
    </article>
  );
}
