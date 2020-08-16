import React from "react";
import GuideGroupCard from "./GuideGroupCard";
import Loading from "../../../Loading";
import GuideHeader from "../Header/GuideHeader";
class GuideDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      loading: true,
      category: "all"
    };
    // this.currentUser = app.auth().currentUser;
    // this.currentUserData = null;
  }
  render() {
    // if (this.state.loading) return <Loading />;
    return (
      <div>
        <GuideHeader />
        <div className="row container-fluid m-0 justify-content-center">
          <GuideGroupCard
            title={"Group Name"}
            groupId={1}
            groupLeader={"def"}
            numOfMembers={4}
            domain={"Artificial Intelligence"}
          />			
			
		  <GuideGroupCard
            title={"Group Name"}
            groupId={2}
            groupLeader={"dml"}
            numOfMembers={3}
            domain={"Artificial Intelligence"}
          />
			
			
          
        </div>
      </div>
    );
  }
}

export default GuideDashboard;
