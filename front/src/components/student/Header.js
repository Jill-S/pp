import React, { Component } from "react";
import { Link } from "react-router-dom";
import SomaiyaLogo from "../../somaiya.svg";
import "./Header.scss";
import axios from "../../axios";

class Header extends Component {
  render() {
    return (
      <div className="sticky-top">
        <div id="Header" className="navbar bg-white shadow-sm">
          <Link to="/" className="navbar-brand">
            <img src={SomaiyaLogo} style={{ height: "2em" }} alt="Home" />
          </Link>
          <div className="dropdown">
            <img
              src={""}
              className="rounded-circle dropdown-toggle shadow-sm"
              data-toggle="dropdown"
              alt={""}
              style={{
                cursor: "pointer",
                width: "3em",
                height: "3em",
              }}
            />
            <div className="dropdown-menu py-2 dropdown-menu-right shadow-sm border-0">
              <Link to="/assignment-list">
                <div className="dropdown-item">
                  <i className="fa fa-folder fa-fw mr-2" />
                  Assignments
                </div>
              </Link>
              <Link to="/profile/personal-section" className="dropdown-item">
                <i className="fa fa-user fa-fw mr-2" />
                Profile
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

export default Header;
