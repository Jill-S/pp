import $ from "jquery";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Loading from "../shared/Loading";
import "./Assignment.scss";
import CommentSection from "./CommentSection";
import Details from "./Details";
import Header from "./Header";
import Uploader from "./Uploader";
import axios from "../../axios";

class Assignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      status: "Not Submitted",
      buttonValue: "Turn In",
      assignmentData: {},
    };
    this.turnedIn = false;
    this.notForMe = false;
  }

  uploadFiles = () => {
    if (this.state.buttonValue === "Turn In") {
      $("#filesToBeUploadedSubmit").trigger("click");
    } else {
      this.setState(
        {
          status: "Not Submitted",
          buttonValue: "Turn In",
        },
        function () {
          $("#turnInButtonUploadFiles")
            .removeClass("btn-danger")
            .addClass("btn-primary");
        }
      );
    }
  };

  // ! bad implementation to check if submitted.
  assignmentStatus = (status) => {
    this.setState({
      status: status,
    });
    if (status === "Not Submitted") {
      this.setState(
        {
          buttonValue: "Turn In",
        },
        function () {
          $("#turnInButtonUploadFiles")
            .removeClass("btn-danger")
            .addClass("btn-primary");
        }
      );
    } else {
      this.setState(
        {
          buttonValue: "Unsubmit",
        },
        function () {
          $("#turnInButtonUploadFiles")
            .addClass("btn-danger")
            .removeClass("btn-primary");
        }
      );
    }
  };

  componentDidMount() {
    axios.get("assignmentList/").then((doc) => {
      // check if that assignment is for that student
      // check if turned In and set this.turnedIn
      // this.setState({ assignmentData: doc.data, loading: false });
      this.setState({ loading: false });
    });
  }

  render() {
    if (this.state.loading) return <Loading />;
    if (this.notForMe) return <Redirect to="/" />;
    return (
      <>
        <Header />
        <div id="Assignment" className="row mx-auto p-2">
          {/* uploader */}
          <div className="col-12 col-xl-3">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header border-0">
                <div className="card-title text-center p-0 m-0 font-weight-bold">
                  Upload Files
                </div>
              </div>

              <div className="card-body border-0 text-center">
                <div className="p-3">
                  <b>Submission Status: </b>
                  {this.state.status}
                </div>
                {this.state.buttonValue === "Turn In" ? (
                  <Uploader assignmentStatus={this.assignmentStatus} />
                ) : null}
              </div>

              <div className="card-footer border-0 text-center">
                <button
                  id="turnInButtonUploadFiles"
                  className="btn btn-primary shadow-sm border-0"
                  onClick={this.uploadFiles}
                >
                  {this.state.buttonValue}
                </button>
              </div>
            </div>
          </div>

          {/* details and comments */}
          <div className="col-12 col-xl-9">
            <div className="d-flex flex-column">
              <Details assignmentData={this.state.assignmentData} />
              <CommentSection id={this.props.match.params.id} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Assignment;
