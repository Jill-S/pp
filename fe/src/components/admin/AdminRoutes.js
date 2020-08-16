import React from "react";
import { Route, Switch } from "react-router-dom";
import AssignmentCreation from "./AssignmentCreation";
import AssignmentDetails from "./AssignmentDetails";
import AssignmentList from "./AssignmentList";
import Dashboard from "./Dashboard";
import FacultyForm from "./FacultyForm";
import GradingStats from "./GradingStats";
import GroupDetails from "./GroupDetails";
import GroupList from "./GroupList";
import GroupSubmissionDetails from "./GroupSubmissionDetails";
import GuideDetailedList from "./GuideDetailedList";
import GuideDetails from "./GuideDetails";
import GuideList from "./GuideList";
import HandleRequests from "./HandleRequests";
import ProjectDetails from "./ProjectDetails";
import ProjectList from "./ProjectList";
import Statistics from "./Statistics";
import StudentDetails from "./StudentDetails";
import StudentList from "./StudentList";

const AdminRoutes = () => {
  return (
    <Switch>
      <Route path={["/", "/dashboard"]} component={Dashboard} />
      <Route exact path="/users/students" component={StudentList} />
      <Route exact path="/users/guides" component={GuideList} />
      <Route exact path="/groups" component={GroupList} />
      <Route exact path="/group/:id" component={GroupDetails} />
      <Route exact path="/assignments" component={AssignmentList} />
      <Route exact path="/submission-statistcs" component={Statistics} />
      <Route exact path="/assignment/:id" component={AssignmentDetails} />
      <Route exact path="/projects" component={ProjectList} />
      <Route exact path="/project/:id" component={ProjectDetails} />
      <Route exact path="/users/guide/:id" component={GuideDetails} />
      <Route path="/users/guide-detailed" component={GuideDetailedList} />
      <Route exact path="/users/student/:id" component={StudentDetails} />
      <Route exact path="/create-assignments" component={AssignmentCreation} />
      <Route exact path="/handle-requests" component={HandleRequests} />
      <Route exact path="/faculty-form" component={FacultyForm} />
      <Route
        exact
        path="/group-submission/:id"
        component={GroupSubmissionDetails}
      />
      <Route exact path="/grade-statistcs" component={GradingStats} />
    </Switch>
  );
};

export default AdminRoutes;
