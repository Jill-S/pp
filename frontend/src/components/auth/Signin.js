import React, { Component } from "react";
import GIF from "./Signin.gif";
import SomaiyaLogo from "../../media/Somaiya.svg";
import $ from "jquery";
import app from "../../Firebase";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
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
  raiseAlert = (type, message) => {
    $("#signin-feedback")
      .html(() =>
        $("<div>", {
          class: `alert alert-${type}`,
          role: "alert",
        }).html(`${message}`)
      )
      .fadeIn();
  };
  handleSubmit = (event) => {
    event.preventDefault();
    $("#signin-feedback").fadeOut("fast", () => $(this).html(""));
    $("#resend-email-verification").fadeOut();
    if (this.somaiyaEmail())
      app
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(({ user }) => {
          if (user.emailVerified) {
            const userDocRef = app
              .firestore()
              .collection("users")
              .doc(user.uid);
            userDocRef.get().then((doc) => {
              if (doc.data().emailVerified === false) {
                userDocRef.update({
                  emailVerified: true,
                });
              }
            });
          } else {
            app
              .auth()
              .signOut()
              .finally(() => {
                this.raiseAlert("warning", "Please verify your email address.");
                $("#resend-email-verification").fadeIn();
              });
          }
        })
        .catch((err) => this.raiseAlert("danger", err.message));
    else
      this.raiseAlert("warning", "Not a valid <b>Somaiya</b> email address.");
  };
  render() {
    return (
      <div
        className="Signin min-vh-100 d-flex noselect"
        style={{ backgroundColor: "#f7f8fa" }}
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
        <div className="d-none d-xl-flex col-7 align-items-center">
          <img src={GIF} alt="Signin GIF" className="w-100" />
        </div>
        <div className="d-flex flex-column col-12 col-xl-5 justify-content-center">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h1 className="text-center">Sign in</h1>
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
            <div className="form-group text-left">
              <div
                className="form-text text-primary"
                onClick={() => this.props.history.replace("/forgot-password")}
                style={{ cursor: "pointer" }}
              >
                Forgot password
              </div>
              <div
                id="resend-email-verification"
                className="form-text text-warning"
                style={{ display: "none", cursor: "pointer" }}
                onClick={() => {
                  $("#signin-feedback").fadeOut("fast", () => $(this).html(""));
                  app
                    .auth()
                    .signInWithEmailAndPassword(
                      this.state.email,
                      this.state.password
                    )
                    .then(({ user }) => {
                      user
                        .sendEmailVerification()
                        .then(() => {
                          this.raiseAlert(
                            "success",
                            "Verification email has been resent."
                          );
                        })
                        .catch((err) => this.raiseAlert("danger", err.message))
                        .finally(() => app.auth().signOut());
                    });
                }}
              >
                Resend email verification
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
              <button
                type="submit"
                className="btn btn-success"
                disabled={!this.somaiyaEmail()}
              >
                Sign in
              </button>
            </div>
            <div
              id="signin-feedback"
              className="form-group"
              style={{ display: "none" }}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Signin;
