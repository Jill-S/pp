import React, { Component } from "react";
import "./GuideHeader.scss";
import { Link } from "react-router-dom";
// import app from "../../../Firebase";
import SomaiyaLogo from "../../../somaiya.svg";
// import UserAvatar from "../../../media/User.png";
import axios from "../../../axios";

class GuideHeader extends Component {
  render() {
    return (
      <div className="sticky-top">
        <div id="guide-header" className="navbar bg-light shadow-sm noselect">
          <Link to="/" className="navbar-brand">
            <img src={SomaiyaLogo} style={{ height: "2em" }} alt="Home" />
          </Link>
          <div className="dropdown">
            <img
              src={""}
              className="rounded-circle dropdown-toggle shadow-sm"
              data-toggle="dropdown"
              alt={""}
              style={{ cursor: "pointer", width: "3em", height: "3em" }}
            />
            <div className="dropdown-menu py-2 dropdown-menu-right shadow-sm border-0">
              <Link to="/dashboard">
                <div className="dropdown-item">
                  <i className="fa fa-folder fa-fw mr-2" />
                  Dashboard
                </div>
              </Link>

              <Link to="/profile/personal-section" className="dropdown-item">
                <i className="fa fa-user fa-fw mr-2" />
                Profile
              </Link>

              <Link to="/details" className="dropdown-item">
                <i className="fa fa-wpforms fa-fw mr-2" />
                Details Form
              </Link>
              <div
                className="dropdown-item"
                onClick={() => axios.get("signout/")}
              >
                <i className="fa fa-lock fa-fw mr-2" />
                Sign out
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GuideHeader;
