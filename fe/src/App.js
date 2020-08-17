import React, { Component } from "react";
import axios from "./axios";
import Error from "./components/shared/Error";
import Loading from "./components/shared/Loading";
import Authentication from "./routes/Authentication";
import StudentRoutes from "./components/student/StudentRoutes";
import AdminRoutes from "./components/admin/AdminRoutes";
import GuideRoutes from "./components/guide/GuideRoutes";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.userType = undefined;
    this.isAuthenticated = false;
  }
  componentDidMount() {
    axios
      .get("whoAmI/")
      .then(({ data }) => {
        this.userType = data.type;
        this.isAuthenticated = true;
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }
  render() {
    if (this.state.loading) return <Loading />;
    if (!this.isAuthenticated) return <Authentication />;
    switch (this.userType) {
      case "student":
        return (
          <div>
            <button
              className="btn btn-link"
              onClick={() =>
                axios.get("signOut/").then(() => window.location.reload())
              }
            >
              Student
            </button>
            <StudentRoutes />
          </div>
        );
      case "coordinator":
        return (
          <div>
            <button
              className="btn btn-link"
              onClick={() =>
                axios.get("signOut/").then(() => window.location.reload())
              }
              hidden
            >
              Admin
            </button>
            <AdminRoutes />
          </div>
        );
      case "guide":
        return (
          <div>
            <GuideRoutes />
            {/* <button
              className="btn btn-link"
              onClick={() =>
                axios.get("signOut/").then(() => window.location.reload())
              }
            >
              Guide
            </button> */}
          </div>
        );
      default:
        return <Error />;
    }
  }
}
