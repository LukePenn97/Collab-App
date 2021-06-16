import React, { useState } from "react";
import Cookies from "universal-cookie";
import {findUserById} from '../../helpers/selectors'

const cookies = new Cookies();







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
    if (userToShow && userToShow.user_skills) {
      userSkills = userToShow.user_skills.map((skill)=>skill.id)
    }
  }
  const isLoggedIn = cookies.get("currentUser");

  const logout = () => {
    cookies.remove("currentUser");
  };
  return (
    <nav class="navbar navbar-light navbar-expand-lg fixed-top" style={{"background-color":" #B8DEE9"}}>
      <div class="container-fluid">
        <a class="navbar-brand" onClick={props.backToHome}>
          CollabApp
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li class="nav-item">
              <a class="nav-link" onClick={props.createNewProject}>Create A Project</a>
            </li>


            {isLoggedIn ? (
              <li class="nav-item">
                <a class="nav-link" onClick={() => logout()}>
                  Log out
                </a>
              </li>
            ) : (
              <div style={{display: "flex"}}>
                <li>
                  <a class="nav-link" onClick={props.registration}>
                    Register
                  </a>
                </li>
                <li>
                  <a class="nav-link" onClick={props.login}>
                    Log In
                  </a>
                </li>
              </div>
            )}
            {/* <li>
                  <a class="nav-link" onClick={props.pickAUser(props)}>
                    Profile
                  </a>
                </li> */}
          </ul>



        </div>
      </div>
    </nav>
  );
}
