import React, { Component } from "react";
import Uploader from "../uploaderRevised/Uploader";
import "./AssignmentDetails.scss";
import $ from "jquery";
import Details from "./Details/Details";
import Comments from "../comments/Comments";
import {Link} from 'react-router-dom';

class AssignmentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Not Submitted",
      buttonValue: "Turn In",
      //s isLeader:false,  // new changes
      // isGuide:true,  // new changes
    };
  }
// new changes here
  // componentDidMount(){
  //   if(this.state.isGuide)
  //   {
  //     $("#turnInButtonUploadFiles").addClass('d-none');
  //     $("#grade-btn").removeClass('d-none');
  //   }
  //   else if(this.state.isLeader){
      
  //     $("#turnInButtonUploadFiles").removeClass('d-none');
  //     $("#grade-btn").addClass('d-none');
  //   }

  // }
// changes end here 

  uploadFiles = () => {
    if (this.state.buttonValue === "Turn In") {
      $("#filesToBeUploadedSubmit").trigger("click");
    }
    
    else {
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

  render() {
    return (
      <div id="AssignmentDetails" className="row mx-auto p-2">
        <div
          className="col-12 col-xl-3 card border-0 mb-4"
          style={{ height: "40vh" }}
        >
          <div className="card-header border-0 shadow-sm">
            <div className="card-title text-center p-0 m-0 h4">
              Upload Files
            </div>
          </div>
          <div className="card-body border-0">
            <div className="text-center py-3">
              <span className="font-weight-bold">Submission Status: </span>
              {this.state.status}
            </div>

            {/* new changes */}
            {/* {
            this.state.buttonValue === "Turn In" && this.state.isLeader ? (
              <Uploader assignmentStatus={this.assignmentStatus} />
            ) : null
            } */}
            {/* new changes end here */}

          </div>
          <div className="card-footer border-0 text-center">
            <button
              id="turnInButtonUploadFiles"
              className="btn btn-primary shadow-sm border-0"
              data-toggle= "tooltip"
              title="Oops ! Looks like you dont have edit access"
              onClick={this.uploadFiles}
            >
              {this.state.buttonValue}
            </button>
            {/* new changes */}
            {/* <div id= "grade-btn" className = "d-none row justify-content-center p-2">
              <Link to = "/grade-assignment">
                <button className = "btn btn-info" style = {{outline:"0", boxShadow:"none"}}>Grade Assignment</button>
              </Link>
            </div> */}
            {/* new changes end here */}
          </div>
          
        </div>
        <div className="col-12 col-xl-9">
          <div className="d-flex flex-column">
            <Details />
            <Comments />
          </div>
        </div>
      </div>
    );
  }
}

export default AssignmentDetails;
