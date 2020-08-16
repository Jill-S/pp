import $ from "jquery";
import React, { Component } from "react";
import SomaiyaLogo from "../../somaiya.svg";
import ForgotpasswordGIF from "./Forgotpassword.gif";

export default class Forgotpassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }
  somaiyaEmail = () =>
    this.state.email.match(/^\w+([.]?\w+)*@somaiya\.edu$/) ? true : false;
  handleChange = (event) => {
    const { target } = event;
    this.setState({ [target.name]: target.value }, () => {
      if (target.name === "email") {
        if (this.somaiyaEmail()) {
          $("#email").addClass("is-valid").removeClass("is-invalid");
        } else {
          $("#email").addClass("is-invalid").removeClass("is-valid");
        }
      }
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
  };
  render() {
    return (
      <div>
        <div className="min-vh-100 d-flex flex-column justify-content-center container">
          <img
            src={SomaiyaLogo}
            alt="Somaiya"
            className="d-none d-xl-block position-fixed"
            style={{ top: "1em", left: "1em", zIndex: "1", height: "3em" }}
          />
          <h1>Forgot password</h1>
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
            <div className="form-group d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-success"
                disabled={!this.somaiyaEmail()}
              >
                Send
              </button>
              <button
                className="btn btn-light text-primary"
                onClick={() => this.props.history.replace("/signin")}
              >
                <span className="fa fa-fw mr-2 fa-chevron-left"></span>
                Back to Sign in
              </button>
            </div>
          </form>
          <div
            className="background"
            style={{ backgroundImage: `url(${ForgotpasswordGIF})` }}
          ></div>
        </div>
      </div>
    );
  }
}
