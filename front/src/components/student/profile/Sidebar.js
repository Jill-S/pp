import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import $ from "jquery";
// import UserImage from "../../../media/User.png";
// import app from "../../../Firebase";

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTabId: JSON.parse(localStorage.getItem("sidebarCurrentTab")),
    };
  }

  // this.props.location.includes("/profile/personal-section") && active

  componentDidMount() {
    const that = this;
    $(this.state.currentTabId).addClass("current-tab");
    $(".tab").click(function () {
      $(".current-tab").removeClass("current-tab");
      let clickedTabId = "#" + $(this).attr("id");
      $(clickedTabId).addClass("current-tab");
      that.setState({ currentTabId: clickedTabId });
      localStorage.setItem(
        "sidebarCurrentTab",
        JSON.stringify(that.state.currentTabId)
      );
    });
  }
  componentWillUnmount() {
    localStorage.setItem("sidebarCurrentTab", JSON.stringify("#tab1"));
  }

  render() {
    return (
      <div
        id="Sidebar"
        className="bg-light m-0 p-0 text-center rounded-left h-100"
      >
        <div
          className="p-0 d-md-none "
          onClick={() => {
            $(".nav-options").toggleClass("d-none");
          }}
        >
          <i class="fa fa-bars" aria-hidden="true"></i>
        </div>
        <div className="profile-pic container-fluid p-3 pb-0 mb-0 d-md-block d-none">
          <img
            src={""}
            // src={app.auth().currentUser.photoURL || `${UserImage}`}
            className="w-100 h-100 mx-auto rounded-lg "
            alt="user avatar"
          />
        </div>
        <div
          className="p-1 nav-options mt-2 d-md-block d-none"
          style={{
            color: "#dcdee0",
            fontSize: "",
            fontWeight: "450",
          }}
        >
          <Link to="/profile/personal-section" className="link">
            <div
              id="tab1"
              className="tab rounded p-2"
              onClick={this.setCurrent}
            >
              {/* <i class="fa fa-user" aria-hidden="true"></i> {" "} */}
              Personal
            </div>
          </Link>

          <Link to="/profile/group-section" className="link">
            <div
              id="tab2"
              className="tab rounded p-2 "
              onClick={this.setCurrent}
            >
              {/* <i class="icon-group"></i> {" "} */}
              Group
            </div>
          </Link>

          <Link to="/profile/guide-section" className="link">
            <div
              id="tab3"
              className="tab rounded p-2 "
              onClick={this.setCurrent}
            >
              Guide
            </div>
          </Link>

          <Link to="/profile/project-section" className="link">
            <div
              id="tab4"
              className="tab rounded p-2"
              onClick={this.setCurrent}
            >
              Project
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
export default Sidebar;
