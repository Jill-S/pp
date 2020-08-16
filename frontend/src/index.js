import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "font-awesome/css/font-awesome.css";
import "./fonts/Inter.css";
import "./fonts/FiraCode.css";
import "./index.scss";
import app from "./Firebase";
import Authenticator from "./components/auth/Authenticator";
import App from "./App";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

// todo: add assignment search page. profile image defaults and in database as well for comment section.

app.auth().onAuthStateChanged((user) => {
	if (user && user.emailVerified) {
		ReactDOM.render(
			<BrowserRouter>
				<Route
					path={["/signin", "/signup", "/forgot-password"]}
					render={() => <Redirect to="/" />}
				/>
				<App />
			</BrowserRouter>,
			document.getElementById("root")
		);
	} else {
		ReactDOM.render(<Authenticator />, document.getElementById("root"));
	}
});
