import React, { Component } from "react";
import Loading from "./components/shared/Loading";
import Authentication from "./routes/Authentication";
import axios from "./axios";
import StudentRoutes from "./components/student/StudentRoutes";
import GuideRoutes from "./components/guide/GuideRoutes";
import AdminRoutes from "./components/admin/AdminRoutes";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, isAuthenticated: false };
    this.type = undefined;
  }

  componentDidMount() {
    // if 403 not authenticated goto authentication page ==> set auth:false
    axios
      .get("whoami/")
      .then(({ data }) => {
        // this.type = data.type;
        this.type = "admin";
        console.log(this.type);
        this.setState({ loading: false, isAuthenticated: true });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    if (this.state.loading) return <Loading />;
    if (!this.state.isAuthenticated) return <Authentication />;
    switch (this.type) {
      case "student":
        return <StudentRoutes />;
      case "guide":
        return <GuideRoutes />;
      case "admin":
        return <AdminRoutes />;
      default:
        break;
    }
  }
}

// return (
//   <button
//     onClick={() => {
//       axios.get("signout/");
//       window.location.reload();
//     }}
//   >
//     signout
//   </button>
// );
