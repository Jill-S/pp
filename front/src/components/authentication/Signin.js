import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import SomaiyaLogo from "../../somaiya.svg";
import SigninGIF from "./Signin.gif";
import axios from "../../axios";

export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    const { target } = event;
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("signIn/", this.state)
      .then(() => {
        window.location.reload();
      })
      .catch((err) =>
        NotificationManager.error("Invalid credentials", null, 3000, null, true)
      );
    // raise warnings and errors in notification popups
  };

  render() {
    return (
      <div>
        <div
          className="min-vh-100 d-flex"
          style={{ backgroundColor: "#f7f8fa" }}
        >
          <img
            src={SomaiyaLogo}
            alt="Somaiya"
            className="d-none d-xl-block position-fixed"
            style={{ top: "1em", left: "1em", zIndex: "1", height: "3em" }}
          />
          <div className="col-7 d-none d-xl-flex justify-content-center align-items-center">
            <img src={SigninGIF} alt="Sign in" className="w-100" />
          </div>
          <div className="col-12 col-xl-5 d-flex flex-column justify-content-center">
            <h1 className="text-center">Sign in</h1>
            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control border-0"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control border-0"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <div
                  onClick={() => this.props.history.replace("/forgot-password")}
                >
                  <div
                    className="form-text text-primary"
                    style={{ cursor: "pointer" }}
                  >
                    Forgot password
                  </div>
                </div>
                <div>
                  <div className="form-text">Resend email verification</div>
                </div>
              </div>
              <div className="form-group d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => this.props.history.replace("/signup")}
                >
                  <span className="fa mr-2 fa-user-circle" />
                  Sign up
                </button>
                <button type="submit" className="btn btn-success">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
