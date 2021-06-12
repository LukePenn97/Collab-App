import React, {useState} from "react";
import axios from 'axios'
import {findUserById} from '../../helpers/selectors'



export default function NavBar(props) {
  let userSkills = []
  if (props.userId) {
    let userToShow;
    userToShow = findUserById(props.userId, props.users)
    for (const user of props.users) {

      if (user.id === Number(props.userId)) {
        userToShow = user
      }
    }
    if (userToShow) {
      userSkills = userToShow.user_skills.map((skill)=>skill.id)
    }
  }
  return (

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" onClick={props.backToHome}>CollabApp</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" onClick={()=>props.autoMatch(userSkills)}>Auto Match</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" onClick={props.createNewProject}>Create A Project</a>
            </li>
          </ul>
          <div class="d-flex">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" onClick={props.registration}>Register</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
