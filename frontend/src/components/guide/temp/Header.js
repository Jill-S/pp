import React, { Component } from "react";
import "./Header.scss";
import Profile from "../profile/Profile";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div id="Header" className="navbar bg-white shadow-sm noselect fixed-top">
        <Link to="/" className="navbar-brand">
          <img src="/assets/images/somaiya.svg" width={150} alt="home" />
        </Link>
        <div className="dropdown">
          <img
            src="/assets/images/profile.jpg"
            className="rounded-circle dropdown-toggle shadow-sm"
            data-toggle="dropdown"
            width={50}
            height={50}
            alt="user avatar"
            style={{ cursor: "pointer" }}
          />
          <div className="dropdown-menu dropdown-menu-right shadow-sm">
            <Link to="/assignments">
              <div className="dropdown-item">
                <i className="fa fa-clipboard fa-fw mr-2" />
                Assignments
              </div>
            </Link>
            <Link to="/create-assignment">
              <div className="dropdown-item">
                <i className="fa fa-chevron-right fa-fw mr-2" />
                Create Assignments
              </div>
            </Link>
            <Link to="/profile/personal-section" className="dropdown-item">
              <i className="fa fa-user fa-fw mr-2" />
              Profile
            </Link>
            <Link to="/faculty-dashboard">
              <div className="dropdown-item">
                {/* <i className="fa fa-chevron-right fa-fw mr-2" /> */}
                Faculty Dashboard
              </div>
            </Link>
            <Link to="/notifications">
              <div className="dropdown-item">
              <i class="fa fa-bell" aria-hidden="true"></i>
                Notifications
              </div>
            </Link>
            <a href="/signin">
              <div className="dropdown-item">
                <i className="fa fa-key fa-fw mr-2" />
                Sign in
              </div>
            </a>
            <Link to="/signout">
              <div className="dropdown-item">
                <i className="fa fa-lock fa-fw mr-2" />
                Sign out
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
