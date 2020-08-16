import React from "react";
import $ from "jquery";
import Header from "../Header/GuideHeader";
// import "./GroupSection.scss";
import Sidebar from "./Sidebar";
class GroupSection extends React.Component {
  edit = () => {
    //if($("$edit-member").css == )
    $("#edit-member2").toggle(); //.css({ display: "block" });
    $("#edit-member3").toggle(); //.css({ display: "block" });
    $("#edit-member4").toggle(); //.css({ display: "block" });
  };
  render() {
    return (
      <div className='group-container'>
        <Header />
        <div className='d-flex align-items-center rounded my-3 noselect'>
          <div
            className='col-11 row mx-auto p-0 rounded shadow'
            style={{ minHeight: "75vh" }}>
            <div className='col-md-3 sidebar col-sm-12  d-md-block rounded m-0 p-0'>
              <Sidebar />
            </div>
            <div className='col-md-9 col-sm-12 m-0 p-3'>
              <div className='group-section container  p-0'>
                <div
                  className='bg-light p-2 px-3 text-center shadow-sm rounded font-weight-bold'
                  style={{ color: "#5b9ecf", fontSize: "1.1em" }}>
                  Group Details
                </div>
                {/* <div className="row" style={{ padding: "10px" }}>
          <h4 className="col-md-6 col-12">Group ID: 1</h4>
          <h4 className="col-md-6 col-12">Group Leader: ABC NMO SYG</h4>
        </div> */}
                <div className='mt-3 bg-light rounded'>
                  <div
                    className='info-section p-3 border-light'
                    style={{ letterSpacing: "0.1em" }}>
                    <div>
                      <p
                        className='text-muted mb-1'
                        style={{ fontSize: "1.3em", fontWeight: "550" }}>
                        Group Id{" "}
                      </p>
                      <p style={{ fontSize: "1.1em" }}>1</p>
                    </div>
                    <hr />
                    <div style={{}}>
                      <p
                        className='text-muted mb-1'
                        style={{ fontSize: "1.3em", fontWeight: "550" }}>
                        Group Leader{" "}
                      </p>
                      <p style={{ fontSize: "1.1em" }}>Abc</p>
                    </div>
                    <hr />

                    <p
                      className='text-muted mb-1'
                      style={{ fontSize: "1.3em", fontWeight: "550" }}>
                      Group Members{" "}
                    </p>
                    <p style={{ fontSize: "1.1em" }} />
                  </div>
                </div>
                <div className='bg-light mt-3 p-0 rounded'>
                  <div className='d-flex flex-md-row flex-column  p-2'>
                    <div className='col-md-2 col-12'>
                      <img
                        src='/assets/images/profile.jpg'
                        className='img-fluid mx-auto rounded'
                        height={80}
                        width={80}
                        alt='user avatar'
                      />
                    </div>
                    <div className='col-md-4 col-12  '>
                      <p>
                        <b>Roll Number :</b> 1814055
                        <br />
                        <b>Name:</b> Jill Shah
                        <br />
                        <b>Email ID:</b> jill25@somaiya.edu
                        <br />
                        <b>Branch :</b> IT
                        <br />
                      </p>
                    </div>
                  </div>
                </div>

                <div className='text-center p-3'>
                  <button
                    className='btn btn-info'
                    onClick={() => {
                      window.location.href = "/profile/project-section/1";
                    }}>
                    {" "}
                    View Project Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default GroupSection;
