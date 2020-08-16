import React from "react";
import GuideHeader from "./Header/GuideHeader";

class DetailsForm extends React.Component {
  render() {
    return (
      <div className='details-form'>
        <GuideHeader />
        <br />
        <div className='mx-auto' style={{ width: "90%" }}>
          <div
            className='p-2 text-center shadow-sm rounded font-weight-bold  mx-auto'
            style={{
              color: "rgb(183, 32, 46)",
              fontSize: "1.1em",
              width: "80%",
              backgroundColor: "rgba(231, 231, 231, 0.459)",
            }}>
            Faculty Details
          </div>
          <br />
          <div
            className='mx-auto col-12 rounded p-4 rounded'
            style={{
              fontSize: "1.1em",
              width: "80%",
              backgroundColor: "rgba(231, 231, 231, 0.459)",
            }}>
            <br />
            <form autoComplete='off'>
              <div className='form-group'>
                <label htmlFor='initials'>Faculty Initials</label>
                <input
                  type='text'
                  name='initials'
                  id='initials'
                  className='form-control border-0 text-center'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='interest1'>Area of Interest 1</label>
                <select
                  type='interest1'
                  name='interest1'
                  id='interest1'
                  className='form-control border-0 text-center'>
                  <option selected>--Select--</option>
                  <option>AI</option>
                  <option>Image Processing</option>
                  <option>Cyber Security</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='thrust1'>
                  Thrust area associated with area of interest 1
                </label>
                <select
                  type='thrust1'
                  name='thrust1'
                  id='thrust1'
                  className='form-control border-0 text-center'>
                  <option selected>--Select--</option>
                  <option>Network and Security</option>
                  <option>Application Development</option>
                  <option>Information Management</option>
                  <option>Knowledge-based systems</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='interest2'>Area of Interest 2</label>
                <select
                  type='interest2'
                  name='interest2'
                  id='interest2'
                  className='form-control border-0 text-center'>
                  <option selected>--Select--</option>
                  <option>AI</option>
                  <option>Image Processing</option>
                  <option>Cyber Security</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='thrust2'>
                  Thrust area associated with area of interest 2
                </label>
                <select
                  type='thrust2'
                  name='thrust2'
                  id='thrust2'
                  className='form-control border-0 text-center'>
                  <option selected>--Select--</option>
                  <option>Network and Security</option>
                  <option>Application Development</option>
                  <option>Information Management</option>
                  <option>Knowledge-based systems</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='interest3'>Area of Interest 3</label>
                <select
                  type='interest3'
                  name='interest3'
                  id='interest3'
                  className='form-control border-0 text-center'>
                  <option selected>--Select--</option>
                  <option>AI</option>
                  <option>Image Processing</option>
                  <option>Cyber Security</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='thrust3'>
                  Thrust area associated with area of interest 3
                </label>
                <select
                  type='thrust3'
                  name='thrust3'
                  id='thrust3'
                  className='form-control border-0'>
                  <option selected>--Select--</option>
                  <option>Network and Security</option>
                  <option>Application Development</option>
                  <option>Information Management</option>
                  <option>Knowledge-based systems</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='interest4'>Area of Interest 4</label>
                <select
                  type='interest4'
                  name='interest4'
                  id='interest4'
                  className='form-control border-0 text-center'>
                  <option selected>--Select--</option>
                  <option>AI</option>
                  <option>Image Processing</option>
                  <option>Cyber Security</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='thrust4'>
                  Thrust area associated with area of interest 4
                </label>
                <select
                  type='thrust4'
                  name='thrust4'
                  id='thrust4'
                  className='form-control border-0 text-center'>
                  <option selected>--Select--</option>
                  <option>Network and Security</option>
                  <option>Application Development</option>
                  <option>Information Management</option>
                  <option>Knowledge-based systems</option>
                </select>
              </div>
              <div className='text-center'>
                <button className='btn btn-outline-success text-center mb-4 '>
                  Submit
                </button>
              </div>
            </form>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default DetailsForm;
