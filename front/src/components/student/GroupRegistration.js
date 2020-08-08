import React, { Component } from "react";
import "./GroupRegistration.scss";

class GroupRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roll1: "",
      roll2: "",
      roll3: "",
      roll4: "",
    };
  }

  signout = () => {
    window.location.replace("/signin");
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  formCorrect = () => {
    return this.state.roll1 !== "" ? true : false;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.formCorrect()) {
      window.location.replace("/");
    }
  };

  render() {
    return (
      <div
        id="GroupRegistration"
        className="row mx-auto noselect"
        style={{ minHeight: "100vh" }}
      >
        <img
          src="/assets/images/somaiya.svg"
          alt="Somaiya"
          className="position-fixed"
          width={200}
          style={{ top: "1em", left: "1em", zIndex: "10000" }}
        />
        <div className="col-7 d-none d-xl-flex justify-content-center align-items-center">
          <img
            src="/assets/images/1.gif"
            alt="Group Registration"
            className="w-100"
          />
        </div>
        <form
          autoComplete="off"
          onSubmit={this.handleSubmit}
          className="col-12 col-xl-5 d-flex flex-column mx-auto justify-content-center align-items-center"
        >
          <div className="form-group h3 mb-5 py-1">Group Registration</div>
          <div className="form-group w-100 required">
            <label htmlFor="roll1" className="control-label">
              Group Leader Roll Number
            </label>
            <input
              type="number"
              name="roll1"
              id="roll1"
              className="form-control shadow-sm rounded"
              onChange={this.handleChange}
              value={this.state.roll1}
              required
              autoFocus
            />
            <small className="form-text" style={{ color: "red" }}>
              <b>Note: </b>
              If not assigned to any group, you may proceed using your roll
              number as{" "}
              <u onClick={() => document.getElementById("roll1").focus()}>
                Group Leader Roll Number
              </u>
              .
            </small>
          </div>
          <div className="form-group w-100">
            <label htmlFor="roll2" className="control-label">
              Member 2 Roll number
            </label>
            <input
              type="number"
              name="roll2"
              id="roll2"
              className="form-control shadow-sm rounded"
              onChange={this.handleChange}
              value={this.state.roll2}
            />
          </div>
          <div className="form-group w-100">
            <label htmlFor="roll3">Member 3 Roll number</label>
            <input
              type="number"
              name="roll3"
              id="roll3"
              className="form-control shadow-sm rounded"
              onChange={this.handleChange}
              value={this.state.roll3}
            />
          </div>
          <div className="form-group w-100">
            <label htmlFor="roll4">Member 4 Roll number</label>
            <input
              type="number"
              name="roll4"
              id="roll4"
              className="form-control shadow-sm rounded"
              onChange={this.handleChange}
              value={this.state.roll4}
            />
          </div>
          <div className="form-group mt-3 w-100 d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-dark shadow-sm"
              onClick={this.signout}
            >
              <i className="fa fa-lock mr-2"></i>
              Sign out
            </button>
            <button
              type="submit"
              className="btn btn-success shadow-sm"
              disabled={!this.formCorrect()}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default GroupRegistration;
