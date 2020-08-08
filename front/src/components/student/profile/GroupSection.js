import React from "react";
import { Button } from "reactstrap";
import { Form } from "reactstrap";
import $ from "jquery";

class GroupSection extends React.Component {
  edit = () => {
    //if($("$edit-member").css == )
    $("#edit-member2").toggle(); //.css({ display: "block" });
    $("#edit-member3").toggle(); //.css({ display: "block" });
    $("#edit-member4").toggle(); //.css({ display: "block" });
  };
  render() {
    return (
      <div className="group-section container  p-0">
        <div
          className="bg-light p-2 px-3 text-center shadow-sm rounded font-weight-bold"
          style={{ color: "#5b9ecf", fontSize: "1.1em" }}
        >
          Group Details
        </div>
        {/* <div className="row" style={{ padding: "10px" }}>
          <h4 className="col-md-6 col-12">Group ID: 1</h4>
          <h4 className="col-md-6 col-12">Group Leader: ABC NMO SYG</h4>
        </div> */}
        <div className="mt-3 bg-light">
          <div
            className="info-section p-3 border-light"
            style={{ letterSpacing: "0.1em" }}
          >
            <div>
              <p
                className="text-muted mb-1"
                style={{ fontSize: "1.3em", fontWeight: "550" }}
              >
                Group Id{" "}
              </p>
              <p style={{ fontSize: "1.1em" }}>1</p>
            </div>
            <hr />
            <div style={{}}>
              <p
                className="text-muted mb-1"
                style={{ fontSize: "1.3em", fontWeight: "550" }}
              >
                Group Leader{" "}
              </p>
              <p style={{ fontSize: "1.1em" }}>Abc</p>
            </div>
            <hr />

            <p
              className="text-muted mb-1"
              style={{ fontSize: "1.3em", fontWeight: "550" }}
            >
              Group Members{" "}
            </p>
            <p style={{ fontSize: "1.1em" }} />
          </div>
        </div>
        <div className="bg-light mt-3">
          <div className="row" style={{ padding: "10px" }}>
            <div className="col-md-2 col-12">
              <img
                src="/assets/images/profile.jpg"
                className="img-fluid mx-auto rounded"
                height={80}
                width={80}
                alt="user avatar"
              />
            </div>
            <div className="col-md-4 col-12">
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
            {/*<span className="col-md-1 col-12" />*/}
            <Form
              className="col-md-6 col-12 row align-items-center"
              id="edit-member2"
              style={{ display: "none" }}
            >
              <Button
                type="button"
                color="danger"
                className="col-md-5 col-12"
                style={{ height: "40%" }}
                onClick={(e) => {
                  $(e.target).parent().parent().hide();
                }}
              >
                Remove
              </Button>
              <span
                className="col-md-2 col-12"
                style={{ margin: "0.5px auto" }}
              />
              <Button
                type="button"
                color="success"
                className="col-md-5 col-12"
                style={{ height: "40%" }}
              >
                Make Leader
              </Button>
            </Form>
          </div>
        </div>
        <div className="mt-3 bg-light">
          <div className="row" style={{ padding: "10px" }}>
            <div className="col-md-2 col-12">
              <img
                src="/assets/images/profile.jpg"
                className="img-fluid mx-auto rounded"
                height={80}
                width={80}
                alt="user avatar"
              />
            </div>
            <div className="col-md-4 col-12">
              <p>
                <b>Roll Number :</b> 1814040
                <br />
                <b>Name:</b> Nishavak Naik
                <br />
                <b>Email ID:</b> nishavak@somaiya.edu
                <br />
                <b>Branch :</b> IT
                <br />
              </p>
            </div>
            {/*<span className="col-md-1 col-12" />*/}
            <Form
              className="col-md-6 col-12 row align-items-center"
              id="edit-member3"
              style={{ display: "none" }}
            >
              <Button
                type="button"
                color="danger"
                className="col-md-5 col-12"
                style={{ height: "40%" }}
                onClick={(e) => {
                  $(e.target).parent().parent().hide();
                }}
              >
                Remove
              </Button>
              <span
                className="col-md-2 col-12"
                style={{ margin: "0.5px auto" }}
              />
              <Button
                type="button"
                color="success"
                className="col-md-5 col-12"
                style={{ height: "40%" }}
              >
                Make Leader
              </Button>
            </Form>
          </div>
        </div>
        <div className="mt-3 bg-light">
          <div className="row" style={{ padding: "10px" }}>
            <div className="col-md-2 col-12">
              <img
                src="/assets/images/profile.jpg"
                className="img-fluid mx-auto rounded"
                height={80}
                width={80}
                alt="user avatar"
              />
            </div>
            <div className="col-md-4 col-12">
              <p>
                <b>Roll Number :</b> 1814033
                <br />
                <b>Name:</b> Atharva Kitkaru
                <br />
                <b>Email ID:</b> atharva.k@somaiya.edu
                <br />
                <b>Branch :</b> IT
                <br />
              </p>
            </div>
            {/*<span className="col-md-1 col-12" />*/}
            <Form
              className="col-md-6 col-12 row align-items-center"
              id="edit-member4"
              style={{ display: "none" }}
            >
              <Button
                type="button"
                color="danger"
                className="col-md-5 col-12"
                style={{ height: "40%" }}
                onClick={(e) => {
                  $(e.target).parent().parent().hide();
                }}
              >
                Remove
              </Button>
              <span
                className="col-md-2 col-12"
                style={{ margin: "0.5px auto" }}
              />
              <Button
                type="button"
                color="success"
                className="col-md-5 col-12"
                style={{ height: "40%" }}
              >
                Make Leader
              </Button>
            </Form>
          </div>
        </div>{" "}
        <Button
          type="button"
          color="info"
          className="col-12 mt-3"
          style={{ width: "25%", float: "right" }}
          id="edit"
          onClick={this.edit}
        >
          Edit
        </Button>
      </div>
    );
  }
}
export default GroupSection;
