import React, { Component } from "react";
import firebase from "firebase";
import app from "../../Firebase";
import $ from "jquery";
import GIF from "./ForgotPassword.gif";
import SomaiyaLogo from "../../media/Somaiya.svg";

class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = { email: "" };
	}
	somaiyaEmail = () =>
		this.state.email.match(/^\w+([.]?\w+)*@somaiya\.edu$/) ? true : false;
	handleChange = (event) => {
		const { target } = event;
		this.setState({ [target.name]: target.value }, () => {
			if (target.name === "email") {
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
		});
	};
	raiseAlert = (type, message) => {
		$("#forgot-password-feedback")
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
		$("#forgot-password-feedback").fadeOut("fast", () => $(this).html(""));
		if (this.somaiyaEmail()) {
			window.removeCaptcha = () => window.rcv.clear();
			window.rcv = new firebase.auth.RecaptchaVerifier("captcha", {
				callback: (res) => {
					app.auth()
						.sendPasswordResetEmail(this.state.email)
						.then(() => {
							this.raiseAlert(
								"success",
								"Password reset email has been sent."
							);
						})
						.catch((err) => {
							this.raiseAlert("danger", err.message);
						})
						.finally(() => {
							window.removeCaptcha();
						});
				},
			});
			window.rcv.render();
		} else
			this.raiseAlert(
				"warning",
				"Not a valid <b>Somaiya</b> email address."
			);
	};
	render() {
		return (
			<div className="ForgotPassword min-vh-100 d-flex noselect">
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
				<div className="container m-auto">
					<form autoComplete="off" onSubmit={this.handleSubmit}>
						<div className="form-group">
							<h1 className="text-left">Forgot Password</h1>
						</div>
						<div className="form-group">
							<small className="form-text">
								Password reset link will be sent to the entered
								somaiya email address.
							</small>
						</div>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								name="email"
								id="email"
								className="form-control border-0"
								onChange={this.handleChange}
								autoFocus
							/>
						</div>
						<div className="form-group" id="captcha" />
						<div className="form-group">
							<button
								type="submit"
								className="btn btn-success"
								disabled={!this.somaiyaEmail()}
							>
								Send
							</button>
						</div>
						<div className="form-group">
							<div
								id="forgot-password-feedback"
								style={{ display: "none" }}
							/>
						</div>
						<div className="form-group">
							<span
								className="text-primary"
								onClick={() =>
									this.props.history.replace("/signin")
								}
								style={{ cursor: "pointer" }}
							>
								Back to signin
							</span>
						</div>
					</form>
					<div
						className="bg"
						style={{
							backgroundImage: `url(${GIF})`,
							opacity: "30%",
							backgroundSize: "cover",
						}}
					/>
				</div>
			</div>
		);
	}
}

export default ForgotPassword;
