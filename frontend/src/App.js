import React, { Component } from "react";
import app from "./Firebase";
import Loading from "./Loading";
import Error from "./Error";
import StudentRoutes from "./components/student/StudentRoutes";
import GuideRoutes from "./components/guide/GuideRoutes";
import AdminRoutes from "./components/admin/AdminRoutes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.currentUser = app.auth().currentUser;
    this.currentUserData = null;
  }
  componentDidMount() {
    const db = app.firestore();
    db.collection("users")
      .doc(this.currentUser.uid)
      .get()
      .then((doc) => {
        this.currentUserData = doc;
        this.setState({ loading: false });
      });
  }
  render() {
    if (this.state.loading) return <Loading />;
    if (this.currentUserData.exists)
      if (this.currentUserData.data().userType === "student")
        return <StudentRoutes />;
      else if (this.currentUserData.data().userType === "guide")
        return <GuideRoutes />;
      else if (this.currentUserData.data().userType === "admin")
        return <AdminRoutes />;
      else if (this.currentUserData.data().userType === "lab_assistant")
        return "Lab assistant";
      else return <Error />;
    else return <Error />;
  }
}

export default App;
