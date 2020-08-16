import React from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";

const Authenticator = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Redirect to="/signin" />
      </Switch>
    </BrowserRouter>
  );
};

export default Authenticator;
