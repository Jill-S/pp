import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import app from "../../Firebase";

const LabAssistantRoutes = () => {
  return (
    <BrowserRouter>
      <Route
        path={["/signin", "/signup", "forgot-password"]}
        render={() => <Redirect to="/" />}
      />
      <div onClick={() => app.auth().signOut()}>Sign out</div>
    </BrowserRouter>
  );
};

export default LabAssistantRoutes;
