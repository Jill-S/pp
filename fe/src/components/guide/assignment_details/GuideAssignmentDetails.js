import React, { Component } from "react";
// import Details from '../assignmentDetails/Details/Details';
// import Synergy from '/assets/images/Synergy.png';
import "./GuideAssignmentDetails.scss";
import { Link } from "react-router-dom";
import GuideCommentSection from "./GuideCommentSection";
import $ from "jquery";
import GuideHeader from "../Header/GuideHeader";

export class GuideAssignmentDetails extends Component {
  state = {
    isTurnedIn: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
  };
  render() {
    // if (this.state.loading) return <Loading />;

    return (
      <div>
        <GuideHeader />
        <div
          id='guide-assignment-details'
          className='container-fluid m-auto p-3'
          style={{ width: "90%" }}>
          <div className='shadow-sm p-3'>
            <div className='py-1'>
              <span
                className='lead'
                style={{ fontSize: "1.3em", fontWeight: "500" }}>
                Assignment Title
              </span>
            </div>
            <div className='row'>
              <div
                className='col-md-4 col-12 text-muted'
                style={{ fontSize: "0.9em" }}>
                Due date : 22/7/20
              </div>
              <div
                className='col-md-4 col-12 text-muted'
                style={{ fontSize: "0.9em" }}>
                Posted on:12/7/20
              </div>
            </div>
            <hr />
            <div>
              <div className='description'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                blanditiis alias at, cum numquam, tempora eaque ab voluptatibus
                ratione dolorum consequatur eum necessitatibus eveniet quam
                atque autem laboriosam molestias magnam?
              </div>
              <div className='attachments d-md-flex'>
                <Link
                  to='files/dummy.pdf'
                  target='_blank'
                  rel='noopener noreferrer'>
                  <div
                    className='file-container mt-3 mr-3 py-1 px-3 text-center border rounded'
                    style={{ borderColor: "gray" }}>
                    dummy.pdf
                  </div>
                </Link>
                <Link
                  to='files/dummy.pdf'
                  target='_blank'
                  rel='noopener noreferrer'>
                  <div
                    className='file-container mt-3 mr-3 py-1 px-3 text-center border rounded'
                    style={{ borderColor: "gray" }}>
                    dummy.pdf
                  </div>
                </Link>
                <Link
                  to='files/dummy.pdf'
                  target='_blank'
                  rel='noopener noreferrer'>
                  <div
                    className='file-container mt-3 mr-3 py-1 px-3 text-center border rounded'
                    style={{ borderColor: "gray" }}>
                    dummy.pdf
                  </div>
                </Link>
                <Link
                  to='files/dummy.pdf'
                  target='_blank'
                  rel='noopener noreferrer'>
                  <div
                    className='file-container mt-3 mr-3 py-1 px-3 text-center border rounded'
                    style={{ borderColor: "gray" }}>
                    dummy.pdf
                  </div>
                </Link>
                <Link
                  to='files/dummy.pdf'
                  target='_blank'
                  rel='noopener noreferrer'>
                  <div
                    className='file-container mt-3 mr-3 py-1 px-3 text-center border rounded'
                    style={{ borderColor: "gray" }}>
                    dummy.pdf
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className='row mx-0  mt-3 '>
            <div className='col-md-6  m-0 pl-0'>
              <div className='shadow-sm  p-3' style={{ minHeight: "20vh" }}>
                <p className='lead '>Submissions</p>
                <hr />
                <div className='submission-section '>
                  {this.state.isTurnedIn ? (
                    <div />
                  ) : (
                    <div className='mx-auto py-2'>
                      <p className='mx-auto d-flex font-italic '>
                        No submissions yet
                      </p>
                      <button className='btn btn-danger'>
                        Send a reminder
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='col-md-6  p-0'>
              <div className=' shadow-sm p-3 '>
                <p className='lead'>Grades</p>
                <hr />
                <div className=''>
                  <p className='d-flex ' style={{ fontSize: "0.9em" }}>
                    <div className='col-3 p-0 '>Weightage :</div>
                    <div className='col-3 '>25 </div>
                  </p>
                  <form onSubmit={this.handleSubmit}>
                    <div className='d-flex py-1'>
                      <div className='col-3 p-0  my-auto'>
                        <span className='' style={{ fontSize: "0.9em" }}>
                          Grade :{" "}
                        </span>
                      </div>
                      <div className='col-9 p-0 '>
                        <input
                          type='number'
                          id='grade'
                          className='form-control w-50 shadow-sm '
                          name='grade'
                          placeholder='enter marks here'
                          disabled
                        />
                      </div>
                    </div>
                    <div />
                    <div className='d-flex justify-content-start pt-3'>
                      <div className='col-md-3 p-0'>
                        <button
                          type='button'
                          className='btn btn-light shadow-sm'
                          data-toggle='tooltip'
                          data-placement='bottom'
                          title='Buttons in grade section will be disabled if there are no submissions'
                          onClick={() => {
                            $("#grade").attr("disabled", false);
                          }}
                          onMouseOver={() => {
                            if (!this.state.isTurnedIn) {
                              $('[data-toggle="tooltip"]').tooltip();
                            }
                          }}
                          disabled={this.state.isTurnedIn ? false : true}>
                          Edit
                        </button>
                      </div>
                      <div className='col-md-3 p-0'>
                        <button
                          type='submit'
                          className='btn btn-light shadow-sm'
                          onClick={() => {
                            $("#grade").attr("disabled", true);
                          }}
                          disabled={this.state.isTurnedIn ? false : true}>
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className=' shadow-sm  col-12 p-0'>
                <GuideCommentSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GuideAssignmentDetails;
