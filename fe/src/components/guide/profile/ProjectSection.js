import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Button } from "reactstrap";
// import Uploader from "../Uploader";
import $ from "jquery";
import "./ProjectSection.scss";
import Header from "../Header/GuideHeader";
import Sidebar from "./Sidebar";

class ProjectSection extends React.Component {
  constructor() {
    super();
    this.state = {};
    // JSON.parse(localStorage.getItem("projectRegistrationFormData")) || {};
  }

  componentDidMount() {
    $("#submit-btn").attr("disabled", true);
  }
  handleChange = (e) => {
    console.log(e.target.value);

    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // inputFile = () =>{
  //   document.getElementById('referenceFiles').click();
  // }
  allowEdit = () => {
    $("#projName").attr("readOnly", false);
    $("#projType").attr("disabled", false);
    $("#projDomain").attr("disabled", false);
    $("#projDescription").attr("readOnly", false);
    $("#edit-btn").attr("disabled", true);
    $("#submit-btn").attr("disabled", false);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // localStorage.setItem(
    //   "projectRegistrationFormData",
    //   JSON.stringify(this.state),
    // );
    this.setState({ successfulSubmission: true });
    $("#projName").attr("readOnly", true);
    $("#projType").attr("disabled", true);
    $("#projDomain").attr("disabled", true);
    $("#projDescription").attr("readOnly", true);
    $("#submit-btn").attr("disabled", true);
    $("#edit-btn").attr("disabled", false);
  };

  render() {
    return (
      <>
        <Header />
        <div className='d-flex align-items-center rounded my-3 noselect'>
          <div
            className='col-11 row mx-auto p-0 rounded shadow'
            style={{ minHeight: "75vh" }}>
            <div className='col-md-3 col-sm-12 d-md-block rounded m-0 p-0'>
              <Sidebar />
            </div>
            <div className='col-md-9 col-sm-12 m-0 p-3'>
              <div className='' id='project-section'>
                <div id='project-registration-link'>
                  <div
                    className='bg-light font-weight-bold m-0 p-0 shadow-sm rounded'
                    style={{ color: "#5b9ecf", fontSize: "1.1em" }}>
                    <p className='p-2 text-center m-0'>Project Details</p>
                  </div>
                  <Form
                    className='project-registration  p-3  mt-3'
                    style={{ fontSize: "1.1em" }}
                    onSubmit={this.handleSubmit}>
                    <div className='row '>
                      <FormGroup className='col-md-12 col-12'>
                        <Label for='projName'>
                          Project Name <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type='text'
                          name='projName'
                          id='projName'
                          className='form-control'
                          placeholder='Enter Project name'
                          onChange={this.handleChange}
                          value={this.state.projName}
                          readOnly={true}
                          required
                          style={{ outline: "none", boxShadow: "none" }}
                        />
                      </FormGroup>
                    </div>
                    <div className='row'>
                      <FormGroup className='col-md-6 col-12'>
                        <Label for='projType'>
                          Select Type of Project{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type='select'
                          name='projType'
                          id='projType'
                          className='form-control'
                          onChange={this.handleChange}
                          value={this.state.projType}
                          disabled={true}
                          required
                          style={{ outline: "none", boxShadow: "none" }}>
                          <option>--Select Project Type--</option>
                          <option>Internal</option>
                          <option>External</option>
                          <option>Inter-Disciplinary</option>
                        </Input>
                      </FormGroup>
                      <FormGroup className='col-md-6 col-12'>
                        <Label for='projDomain'>
                          Select Domain of Project{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type='select'
                          name='projDomain'
                          id='projDomain'
                          className='form-control'
                          onChange={this.handleChange}
                          value={this.state.projDomain}
                          disabled={true}
                          required
                          style={{ outline: "none", boxShadow: "none" }}>
                          <option>--Select Project Domain--</option>
                          <option>
                            Cyber Security (Forensics, Blockchain Technology,
                            Biometrics Security, Cryptographic Teachniques)
                          </option>
                          <option>Image Processing (Computer Vision)</option>
                          <option>
                            Artificial Intelligence (Machine Learning, Natural
                            Language Processing, Robotics)
                          </option>
                          <option>Computer Networking</option>
                          <option>Big Data Processing</option>
                          <option>
                            Embedded and Hardware Integrated Applications (IOT)
                          </option>
                          <option>
                            Augmented and Virtual Reality (Game Programming)
                          </option>
                          <option>GIS</option>
                          <option>
                            Cloud Computing (High Performance Computing)
                          </option>
                          <option>
                            System Programming (Compiler Constaruction, OS,
                            Device Drivers)
                          </option>
                          <option>Quantum Computing</option>
                          <option>Software Test Automation</option>
                        </Input>
                      </FormGroup>
                    </div>
                    {this.state.projType === "Inter-Disciplinary" && (
                      <FormGroup className='col-md-12 col-12  p-0'>
                        <Label for='additional-details'>
                          Enter the reason for opting for inter-disciplinary
                          project{" "}
                          {/* <span style={{ color: "red" }}>*</span> */}
                        </Label>
                        <Input
                          type='textarea'
                          name='additional-details'
                          rows='2'
                          className='form-control'
                          id='additional-details'
                          placeholder='Write the reason here'
                          onChange={this.handleChange}
                          value={this.state.projDescription}
                          required
                          style={{ outline: "none", boxShadow: "none" }}
                        />
                      </FormGroup>
                    )}
                    <div className='row'>
                      <FormGroup className='col-md-12 col-12 '>
                        <Label for='projDescription'>
                          Enter the Project Description{" "}
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type='textarea'
                          name='projDescription'
                          rows='7'
                          className='form-control'
                          id='projDescription'
                          placeholder='Description'
                          onChange={this.handleChange}
                          value={this.state.projDescription}
                          required
                          style={{ outline: "none", boxShadow: "none" }}
                          readOnly={true}
                        />
                      </FormGroup>
                    </div>
                    <div
                      className='row'
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />

                    {/* <Uploader /> */}
                    <br />
                    <div className='row mx-auto'>
                      <div className='col-12 col-md-4 p-1 mx-auto'>
                        <Button
                          className='btn btn-success w-75 mx-auto'
                          id='submit-btn'
                          style={{
                            color: "white",
                            outline: "none",
                            boxShadow: "none",
                          }}
                          type='submit'>
                          Submit
                        </Button>
                      </div>

                      <div className='col-12 col-md-4 p-1'>
                        <Button
                          id='edit-btn'
                          className='btn btn-info w-75 mx-auto'
                          style={{
                            color: "white",
                            outline: "none",
                            boxShadow: "none",
                          }}
                          type='button'
                          onClick={this.allowEdit}>
                          Edit
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      //</div>
    );
  }
}
export default ProjectSection;
