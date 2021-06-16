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
  // <nav className="navbar navbar-light navbar-expand-lg fixed-top" style={{background: "rgba(184, 222, 233, 0.2)"}}>
  return (
    <nav className="navbar navbar-light navbar-expand-lg fixed-top" style={{background: "rgba(184, 222, 233, 0.2)"}}>
      <div className="container-fluid">
        <a className="navbar-brand" onClick={props.backToHome}>
          CollabApp
        </a>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
          <span class="navbar-toggler-icon"></span>
      </button>
    <div class="navbar-collapse collapse order-3 dual-collapse2">
        {isLoggedIn ? (
          <ul class="navbar-nav ml-auto">
          
          <li className="nav-item">
            <a className="nav-link text-nowrap" onClick={props.createNewProject}>Create A Project</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-nowrap" onClick={() => {
                cookies.remove("currentUser");
                window.location.reload();
                }}>
              Logout
            </a>
          </li>
          </ul>
          
        ) : (
          <ul class="navbar-nav ml-auto">
          <div style={{display: "flex"}}>
            <li>
              <a className="nav-link text-nowrap" onClick={props.register}>
                Register
              </a>
            </li>
            <li>
              <a className="nav-link text-nowrap" onClick={()=>{
                  cookies.set("currentUser", 1, { path: "/" })
                  window.location.reload()
                }}>
                Login
              </a>
            </li>
          </div>
          </ul>
        )}
    </div>
    </nav>
  );
}

/*
<button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li className="nav-item">
              <a className="nav-link" onClick={props.createNewProject}>Create A Project</a>
            </li>


            {isLoggedIn ? (
              <li className="nav-item">
                <a className="nav-link" onClick={props.createNewProject}>Create A Project</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => logout()}>
                  Log out
                </a>
              </li>
            ) : (
              <div style={{display: "flex"}}>
                <li>
                  <a className="nav-link" onClick={props.registration}>
                    Register
                  </a>
                </li>
                <li>
                  <a className="nav-link" onClick={props.login}>
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
*/