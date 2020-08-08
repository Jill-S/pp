import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Signin from "../components/authentication/Signin";
import Signup from "../components/authentication/Signup";
import Forgotpassword from "../components/authentication/Forgotpassword";

export default function Authentication() {
  return (
    <Switch>
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/forgot-password" component={Forgotpassword} />
      <Redirect to="/signin" />
    </Switch>
  );
}
