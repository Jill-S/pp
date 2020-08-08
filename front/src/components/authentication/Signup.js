import $ from "jquery";
import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import SomaiyaLogo from "../../somaiya.svg";
import SignupGIF from "./Signup.gif";
import axios from "../../axios";

const branch = [
  "Information Technology",
  "Computer Science",
  "Electronics",
  "Electronics and Telecommunication",
  "Mechanical",
];

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      rollNumber: "",
      branch: branch[0],
    };
  }

  somaiyaEmail = () =>
    this.state.email.match(/^\w+([.]?\w+)*@somaiya\.edu$/) ? true : false;

  securePassword = () =>
    this.state.password.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,128}$/
    )
      ? true
      : false;

  handleChange = (event) => {
    const { target } = event;
    this.setState({ [target.name]: target.value }, () => {
      if (target.name === "email") {
        if (this.somaiyaEmail()) {
          $("#email").addClass("is-valid").removeClass("is-invalid");
        } else {
          $("#email").addClass("is-invalid").removeClass("is-valid");
        }
      } else if (target.name === "password") {
        if (this.securePassword()) {
          $("#password").addClass("is-valid").removeClass("is-invalid");
          if (this.state.password === this.state.confirmPassword) {
            $("#confirmPassword")
              .addClass("is-valid")
              .removeClass("is-invalid");
          } else {
            $("#confirmPassword")
              .addClass("is-invalid")
              .removeClass("is-valid");
          }
        } else {
          $("#password").addClass("is-invalid").removeClass("is-valid");
          $("#confirmPassword").removeClass("is-valid is-invalid");
        }
      } else if (target.name === "confirmPassword") {
        if (this.state.password === this.state.confirmPassword) {
          $("#confirmPassword").addClass("is-valid").removeClass("is-invalid");
        } else {
          $("#confirmPassword").addClass("is-invalid").removeClass("is-valid");
        }
      }
    });
  };

  isFormValid = () => {
    return this.somaiyaEmail() &&
      this.securePassword() &&
      this.state.password === this.state.confirmPassword &&
      this.state.rollNumber !== "" &&
      this.state.name !== "" &&
      branch.includes(this.state.branch)
      ? true
      : false;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid()) {
      axios
        .post("studentList/", JSON.stringify(this.state))
        .then((res) => {
          NotificationManager.success(
            "Please verify your email address to proceed",
            null,
            10000,
            null,
            true
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      NotificationManager.error("Form tampered", null, 3000, null, true);
    }
  };

  render() {
    return (
      <div>
        <div
          className="min-vh-100 d-flex"
          style={{ backgroundColor: "#f9f3ed" }}
        >
          <img
            src={SomaiyaLogo}
            alt="Somaiya"
            className="d-none d-xl-block position-fixed"
            style={{ top: "1em", left: "1em", zIndex: "1", height: "3em" }}
          />
          <div className="col-7 d-none d-xl-flex justify-content-center align-items-end">
            <img src={SignupGIF} alt="Sign up" className="w-100" />
          </div>
          <div className="col-12 col-xl-5 d-flex flex-column justify-content-center">
            <h1 className="text-center">Sign up</h1>
            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="rollNumber">Roll number</label>
                <input
                  type="number"
                  name="rollNumber"
                  id="rollNumber"
                  className="form-control border-0"
                  onChange={this.handleChange}
                />
                <small className="form-text text-danger">
                  <b>Caution: </b>
                  <span>You cannot change roll number later.</span>
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control border-0"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="branch">Branch</label>
                <select
                  name="branch"
                  id="branch"
                  className="custom-select border-0"
                  onChange={this.handleChange}
                  value={this.state.branch}
                >
                  {branch.map((branchItem) => (
                    <option value={branchItem} key={branch.indexOf(branchItem)}>
                      {branchItem}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control border-0"
                  onChange={this.handleChange}
                />
                <small className="form-text invalid-feedback">
                  Please input valid somaiya email address.
                </small>
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
                <small className="form-text invalid-feedback">
                  Password not secure enough.
                </small>
                <small className="form-text text-muted">
                  At least 8 characters—the more characters, the better.
                  <br /> A mixture of both uppercase and lowercase letters.
                  <br /> A mixture of letters and numbers.
                  <br /> Inclusion of at least one special character, e.g., ! @
                  # ? &#93;
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Re-enter password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="form-control border-0"
                  onChange={this.handleChange}
                  disabled={!this.securePassword()}
                />
                <small className="form-text invalid-feedback">
                  Passwords do not match.
                </small>
              </div>
              <div className="form-group d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-light text-primary"
                  onClick={() => this.props.history.replace("/signin")}
                >
                  <span className="fa mr-2 fa-chevron-left" />
                  Sign in
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={!this.isFormValid()}
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
