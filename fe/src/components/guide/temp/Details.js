import React, { Component } from "react";
import "./Details.scss";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="Details" className="bg-white shadow-sm rounded p-3">{/* new changes */}
        <h3 className="">Assignment Title</h3>
        <hr />
        <div className="desc">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur
          pariatur, nam at labore eaque quisquam ducimus delectus repudiandae
          cum sint impedit asperiores culpa saepe omnis nisi iure dignissimos
          ipsa quae.
        </div>
        <div className="submissionData d-flex flex-xl-row flex-column mx-auto justify-content-between py-3">
          <p className="p-0 m-0 d-flex justify-content-between">
            <span className="font-weight-bold mr-2">Posted on:</span>
            <span>15/5/2020</span>
          </p>
          <p className="p-0 m-0 d-flex justify-content-between">
            <span className="font-weight-bold mr-2">Weightage:</span>
            <span>25</span>
          </p>
          <p className="p-0 m-0 d-flex justify-content-between">
            <span className="font-weight-bold mr-2">Due date:</span>
            <span>15/8/2020</span>
          </p>
        </div>
        <div className="attachments">
          <span className="font-weight-bold">Attachments:</span> None
        </div>
      </div>
    );
  }
}

export default Details;
