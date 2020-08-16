import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/header/Header";
import Signin from "./components/signin/Signin";
import Signup from "./components/signup/Signup";
import $ from "jquery";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import AssignmentList from "./components/assignmentList/AssignmentList";
import Profile from "./components/profile/Profile";
import AssignmentDetails from "./components/assignmentDetails/AssignmentDetails";
import GroupRegistration from "./components/groupRegistration/GroupRegistration";
import ProjectRegistration from "./components/projectRegistration/ProjectRegistration";
import CreateAssignment from "./components/assignmentList/CreateAssignment";
import FacultyDashboard from "./components/faculty/FacultyDashboard";
import GradingAssignments from "./components/faculty/GradingAssignments";
import FacultyAssignmentList from "./components/faculty/FacultyAssignmentList";
import FacultyAssignmentDetails from "./components/faculty/FacultyAssignmentDetails";
import Notifications from './components/faculty/Notifications';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
      $('[data-toggle="popover"]').popover();
      $(".popover-dismiss").popover({
        trigger: "focus"
      });
      $(".toast").toast("show");
      $(".alert").alert();
    });
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/group-registration" component={GroupRegistration} />
          <Route path="/project-registration" component={ProjectRegistration} />
          <Route path="/create-assignment" component={CreateAssignment} />
          <Route path={["/signin", "/signup", "/forgot-password"]}>
            <Route exact path="/signin">
              <Signin />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/forgot-password">
              <ForgotPassword />
            </Route>
          </Route>
          <Fragment>
            <Header />
            <div style={{ marginTop: "4.3em" }} />

            <Route
              exact
              path={["/", "/assignments"]}
              component={AssignmentList}
            />
            <Route path="/assignment" id={1}>
              <AssignmentDetails />
            </Route>
            <Route path="/faculty-dashboard">
              <FacultyDashboard />
            </Route>
            <Route exact path="/guide-assignment-details">
              <FacultyAssignmentDetails />
            </Route>
            <Route path="/assignments-guide">
              <FacultyAssignmentList />
            </Route>
            <Route path="/grade-assignment">
              <GradingAssignments />
            </Route>
            <Route path="/notifications">
              <Notifications />
            </Route>
            <Route path="/profile" component={Profile} />
          </Fragment>
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
