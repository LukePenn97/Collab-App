import React, { useState } from "react";
import Button from "../Button";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function NavBar(props) {

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
              <a class="nav-link" onClick={props.filterProjectsBySkills}>Auto Match</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" onClick={props.createNewProject}>
                Create A Project
              </a>
            </li>

            {isLoggedIn ? (
              <li class="nav-item">
                <a class="nav-link" onClick={() => logout()}>
                  Log out
                </a>
              </li>
            ) : (
              <span >
                <li>
                  <a class="nav-link" onClick={props.registration}>
                    Register
                  </a>
                </li>
                <li>
                  <a class="nav-link" onClick={props.registration}>
                    Log in
                  </a>
                </li>
              </span>
            )}
          </ul>
          <div class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              id="searchbar"
              onChange={onKeywordChanged}
            ></input>
            <button class="btn btn-outline-success" onClick={submitKeyword}>
              Search
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
