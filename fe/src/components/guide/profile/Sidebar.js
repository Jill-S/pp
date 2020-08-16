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
      currentTabId:
        JSON.parse(localStorage.getItem("sidebarCurrentTab")) || "#tab2",
    };
  }

  // this.props.location.includes("/profile/personal-section") && active

  componentDidMount() {
    const that = this;
    console.log(this.state.currentTabId);
    // $(".current-tab").removeClass("current-tab");
    $(this.state.currentTabId).addClass("current-tab");
    $(".tab").click(function () {
      $(".current-tab").removeClass("current-tab");
      let clickedTabId = "#" + $(this).attr("id");
      $(clickedTabId).addClass("current-tab");
      that.setState({ currentTabId: clickedTabId });
      //   console.log(that.state.currentTabId);
      localStorage.setItem("sidebarCurrentTab", JSON.stringify(clickedTabId));
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
          <Link
            to="/profile/personal-section"
            className="link"
            onClick={() => {
              $(".nav-options").toggleClass("d-none");
            }}
          >
            <div id="tab1" className="tab rounded p-2">
              Personal
            </div>
          </Link>

          <Link
            to="/profile/group-section/1"
            className="link"
            onClick={() => {
              $(".nav-options").toggleClass("d-none");
            }}
          >
            <div id="tab2" className="tab rounded p-2 ">
              Group 1
            </div>
          </Link>

          <Link
            to="/profile/group-section/2"
            className="link"
            onClick={() => {
              $(".nav-options").toggleClass("d-none");
            }}
          >
            <div id="tab3" className="tab rounded p-2 ">
              Group 2
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
export default Sidebar;
