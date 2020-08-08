import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import StudentList from "./StudentList";
import GuideList from "./GuideList";
import GroupList from "./GroupList";
import AssignmentList from "./AssignmentList";
import ProjectList from "./ProjectList";
import StudentDetails from "./StudentDetails";
import GroupDetails from "./GroupDetails";
import GuideDetails from "./GuideDetails";
import ProjectDetails from "./ProjectDetails";
import AssignmentCreation from "./AssignmentCreation";
import HandleRequests from "./HandleRequests";
import AssignmentDetails from "./AssignmentDetails";
import GroupSubmissionDetails from "./GroupSubmissionDetails";
import Statistics from "./Statistics";
import FacultyForm from "./FacultyForm";
import GuideDetailedList from "./GuideDetailedList";

const AdminRoutes = () => {
  return (
    <Switch>
      <Route path={["/", "/dashboard"]} component={Dashboard} />
      <Route exact path='/users/students' component={StudentList} />
      <Route exact path='/users/guides' component={GuideList} />
      <Route exact path='/groups' component={GroupList} />
      <Route exact path='/group/:id' component={GroupDetails} />
      <Route exact path='/assignments' component={AssignmentList} />
      <Route exact path='/statistcs' component={Statistics} />
      <Route exact path='/assignment/:id' component={AssignmentDetails} />
      <Route exact path='/projects' component={ProjectList} />
      <Route exact path='/project/:id' component={ProjectDetails} />
      <Route exact path='/users/guide/:id' component={GuideDetails} />
      <Route path='/users/guide-detailed' component={GuideDetailedList} />
      <Route exact path='/users/student/:id' component={StudentDetails} />
      <Route exact path='/create-assignments' component={AssignmentCreation} />
      <Route exact path='/handle-requests' component={HandleRequests} />
      <Route exact path='/faculty-form' component={FacultyForm} />
      <Route
        exact
        path='/group-submission/:id'
        component={GroupSubmissionDetails}
      />
    </Switch>
  );
};

export default AdminRoutes;
