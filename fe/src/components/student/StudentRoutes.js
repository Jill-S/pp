import React from "react";
import { Route } from "react-router-dom";
import AssignmentList from "./AssignmentList";
import Assignment from "./Assignment";
import Profile from "./profile/Profile";

const StudentRoutes = () => {
  return (
    <div className="">
      <Route
        exact
        path={["/", "/assignment-list"]}
        component={AssignmentList}
      />
      <Route path="/assignment/:id" component={Assignment} />
      <Route path="/profile" component={Profile} />
    </div>
  );
};

export default StudentRoutes;
