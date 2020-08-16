import React, { Component } from "react";
import GIF from "./Signup.gif";
import app from "../../Firebase";
import SomaiyaLogo from "../../media/Somaiya.svg";
import $ from "jquery";

const branch = [
  "Information Technology",
  "Computer Science",
  "Electrical",
  "Electronics and Telecommunication",
  "Mechanical",
];

class Signup extends Component {
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
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,256}$/
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
  raiseAlert = (type, message) => {
    $("#signup-feedback")
      .html(() =>
        $("<div>", {
          class: `alert alert-${type}`,
          role: "alert",
        }).html(message)
      )
      .fadeIn();
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
    $("#signup-feedback").fadeOut("fast", () => $(this).html(""));
    if (this.isFormValid())
      app
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(({ user }) => {
          app
            .firestore()
            .collection("users")
            .doc(user.uid)
            .set({
              name: this.state.name,
              email: this.state.email,
              rollNumber: this.state.rollNumber,
              branch: this.state.branch,
              group: null,
              isLeader: false,
              emailVerified: false,
              userType: "student",
            })
            .then(() => {
              user.updateProfile({
                displayName: this.state.name,
              });
              user.sendEmailVerification().then(() => {
                this.raiseAlert(
                  "success",
                  "Verification email has been sent.<br />Please sign in after verification to complete registration process."
                );
              });
            })
            .catch((err) => this.raiseAlert("danger", err.message))
            .finally(() => app.auth().signOut());
        })
        .catch((err) => this.raiseAlert("danger", err.message));
    else this.raiseAlert("warning", "Form should not be tampered.");
  };
  render() {
    return (
      <div
        className="Signup min-vh-100 d-flex noselect"
        style={{ backgroundColor: "#f9f3ed" }}
      >
        <img
          src={SomaiyaLogo}
          alt="Somaiya logo"
          className="d-none d-xl-block position-fixed"
          style={{
            zIndex: "1",
            top: "1em",
            left: "1em",
            height: "3em",
          }}
        />
        <div className="d-none d-xl-flex col-7 align-items-end">
          <img src={GIF} alt="Signup GIF" className="w-100" />
        </div>
        <div className="col-12 col-xl-5 d-flex flex-column justify-content-center overflow-auto">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h1 className="text-center">Sign up</h1>
            </div>
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
                Please use valid <b>Somaiya</b> email address.
              </small>
              <small
                className="form-text text-muted text-right"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.setState(
                    {
                      email: this.state.email + "@somaiya.edu",
                    },
                    () => {
                      $("#email").val(this.state.email).focus();
                      if (this.somaiyaEmail()) {
                        $("#email")
                          .addClass("is-valid")
                          .removeClass("is-invalid");
                      } else {
                        $("#email")
                          .addClass("is-invalid")
                          .removeClass("is-valid");
                      }
                    }
                  );
                }}
              >
                append @somaiya.edu
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
                <br /> Inclusion of at least one special character, e.g., ! @ #
                ? &#93;
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
                className="btn btn-link bg-light text-decoration-none"
                onClick={() => this.props.history.replace("/signin")}
              >
                <span className="fa mr-2 fa-chevron-left" />
                Sign in
              </button>
              <button
                className="btn btn-success"
                disabled={!this.isFormValid()}
              >
                Sign up
              </button>
            </div>
            <div className="form-group" id="signup-feedback" />
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
