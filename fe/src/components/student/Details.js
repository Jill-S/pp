import React, { Component } from "react";
import "./Details.scss";

class Details extends Component {
  render() {
    return (
      <div id="Details" className="bg-white shadow-sm rounded p-3">
        <h3 className="">
          {this.props.assignmentData.title}
          <span className="badge badge-primary ml-2">Graded</span>
        </h3>
        <hr />
        <div className="desc">{this.props.assignmentData.description}</div>
        <div className="submissionData d-flex flex-xl-row flex-column mx-auto justify-content-between py-3">
          <p className="p-0 m-0 d-flex justify-content-between">
            <b className="mr-2">Posted on:</b>
            <span>
              {new Date(
                this.props.assignmentData.posted.seconds * 1000
              ).toLocaleString()}
            </span>
          </p>
          <p className="p-0 m-0 d-flex justify-content-between">
            <b className="mr-2">Weightage:</b>
            <span>{this.props.assignmentData.weightage}</span>
          </p>
          <p className="p-0 m-0 d-flex justify-content-between">
            <b className="mr-2">Due date:</b>
            <span>
              {new Date(
                this.props.assignmentData.due.seconds * 1000
              ).toLocaleString()}
            </span>
          </p>
        </div>
        <div className="attachments">
          <b>Attachments:</b> None
        </div>
      </div>
    );
  }
}

export default Details;
