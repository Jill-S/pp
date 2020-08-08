import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./Profile.scss";
import Sidebar from "./Sidebar";
import PersonalSection from "./PersonalSection";
import GroupSection from "./GroupSection";
import GuideSection from "./GuideSection";
import ProjectSection from "./ProjectSection";
import Header from "../Header";
import Loading from "../../shared/Loading";
// import app from "../../../Firebase";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPasswordForm: false,
      loading: true,
    };
    // this.currentUser = app.auth().currentUser;
    this.currentUserData = null;
  }

  componentDidMount() {
    this.setState({ loading: false });
    // let db = app.firestore();
    // db.collection("users")
    // 	.doc(this.currentUser.uid)
    // 	.get()
    // 	.then((doc) => {
    // 		this.currentUserData = doc.data();
    // 		this.setState({ loading: false });
    // 	});
  }

  render() {
    if (this.state.loading) return <Loading />;
    return (
      <>
        <Header />
        <div className="d-flex align-items-center rounded my-3 noselect">
          <div
            className="col-11 row mx-auto p-0 rounded shadow"
            style={{ minHeight: "75vh" }}
          >
            <div className="col-md-3 col-sm-12 d-md-block rounded m-0 p-0">
              <Sidebar />
            </div>
            <div className="col-md-9 col-sm-12 m-0 p-0">
              <Switch>
                <Route
                  exact
                  path="/profile/personal-section"
                  render={() => (
                    <PersonalSection currentUserData={this.currentUserData} />
                  )}
                />
                <Route
                  exact
                  path="/profile/group-section"
                  render={() => (
                    <GroupSection currentUserData={this.currentUserData} />
                  )}
                />
                <Route
                  exact
                  path="/profile/guide-section"
                  render={() => (
                    <GuideSection currentUserData={this.currentUserData} />
                  )}
                />
                <Route
                  exact
                  path="/profile/project-section"
                  render={() => (
                    <ProjectSection currentUserData={this.currentUserData} />
                  )}
                />
              </Switch>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Profile;
