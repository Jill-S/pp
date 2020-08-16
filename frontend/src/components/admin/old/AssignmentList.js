import React from "react";
import { Link } from "react-router-dom";
import AssignmentCard from "./AssignmentCard";
import "./AssignmentList.scss";
import ReactSearchBox from "react-search-box";
// docs : https://www.npmjs.com/package/react-search-box
class AssignmentList extends React.Component {
  data = [
    {
      key: "john",
      value: "John Doe"
    },
    {
      key: "jane",
      value: "Jane Doe"
    },
    {
      key: "mary",
      value: "Mary Phillips"
    },
    {
      key: "robert",
      value: "Robert"
    },
    {
      key: "karius",
      value: "Karius"
    }
  ];
  render() {
    return (
      <div className="assignment-list mx-auto " style={{ width: "90%" }}>
        <br />
        <div
          className=" p-2   text-center shadow-sm rounded font-weight-bold  mx-auto"
          style={{
            color: "rgb(183, 32, 46)",
            fontSize: "1.1em",
            width: "auto",
            backgroundColor: "rgba(231, 231, 231, 0.459)"
          }}
        >
          Assignments
        </div>
        <div className=" d-flex flex-md-row flex-column justify-content-between mx-auto mt-4 p-0">
          <div className="col-md-5 p-0 pl-2 my-1 ">
            <ReactSearchBox
              placeholder="Search for assignments here ..."
              data={this.data}
              autoFocus="true"
              inputBoxBorderColor="#e1e6e2"
              callback={record => console.log(record)}
            />
          </div>
          <div className="col-md-3 text-center p-0 my-1">
            <div className="col-md-6 col-12 mx-auto p-0 ">
              <Link to="/create-assignments">
                <div className="create-button rounded-lg py-2 px-0  mx-auto">
                  <i className="fa fa-plus mr-2" aria-hidden="true" />
                  Create
                </div>
              </Link>
            </div>
            </div>
            <div className="col-md-4 text-center p-0 my-1">
            <div className="col-md-6 col-12 mx-auto p-0 ">
              <Link to="/statistics">
                <div className="create-button rounded-lg py-2 px-0  mx-auto">
                  See Statistics
                </div>
              </Link>
            </div>
            </div>
            
        </div>

        <div className="p-2">
          <AssignmentCard />
          <AssignmentCard />
          <AssignmentCard />
        </div>
      </div>
    );
  }
}
export default AssignmentList;
