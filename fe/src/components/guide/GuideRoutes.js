import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
// import app from "../../Firebase";
import GuideDashboard from "./dashboard/GuideDashboard";
import GuideAssignmentList from "./assignment_list/GuideAssignmentList";
import GuideAssignmentDetails from "./assignment_details/GuideAssignmentDetails";
// import Profile from "./Profile";
import DetailsForm from "./DetailsForm";
// import Profile from "./profile/Profile";
import PersonalSection from "./profile/PersonalSection";
import GroupSection from "./profile/GroupSection";
import ProjectSection from "./profile/ProjectSection";

const GuideRoutes = () => {
  return (
    <BrowserRouter>
      <Route exact path={["/", "/dashboard"]} component={GuideDashboard} />
      {/* <Route exact path='/profile' component={Profile} /> */}
      <Route exact path="/details" component={DetailsForm} />
      <Route exact path="/assignment-list" component={GuideAssignmentList} />
      <Route exact path="/assignment/:id" component={GuideAssignmentDetails} />
      <Route
        exact
        path="/profile/personal-section"
        render={() => <PersonalSection />}
      />
      <Route
        exact
        path="/profile/group-section/1"
        render={() => <GroupSection />}
      />

      <Route
        exact
        path="/profile/group-section/2"
        render={() => <GroupSection />}
      />

      <Route
        exact
        path="/profile/project-section/1"
        render={() => <ProjectSection />}
      />
      <Route
        exact
        path="/profile/project-section/2"
        render={() => <ProjectSection />}
      />
    </BrowserRouter>
  );
};

export default GuideRoutes;
