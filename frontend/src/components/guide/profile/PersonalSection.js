import React from "react";
import $ from "jquery";
import "./PersonalSection.scss";
import app from "../../../Firebase";
import Loading from "../../../Loading";
import Croppie from "croppie/croppie.js";
import Header from "../Header/GuideHeader";
import Sidebar from "./Sidebar";

import "croppie/croppie.css";
// import "croppie/croppie.min.js";
class PersonalSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPasswordForm: false,
    };
    this.currentUser = app.auth().currentUser;
    this.currentUserData = this.props.currentUserData;
  }

  titleCase = (string) => {
    var sentence = string.toLowerCase().split(" ");
    for (var i = 0; i < sentence.length; i++) {
      sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(" ");
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let password = document.getElementById("password").value;
    let confirmed_password = document.getElementById("confirmed-password")
      .value;
    if (password === confirmed_password) {
      app
        .auth()
        .currentUser.updatePassword(password)
        .then(() => {
          alert("Password updated");
          this.togglePasswordForm();
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      document.getElementById("error-msg").innerHTML =
        "Make sure both the passwords match !";
      $(".password").css("border", "1px solid red");
      $(".confirmed-password").css("border", "1px solid red");
    }
  };

  uploadImage = (e) => {
    e.preventDefault();
    const image__file = $("#profilePicture").prop("files")[0];
    const ext = image__file.name.substr(image__file.name.lastIndexOf(".") + 1);
    if (ext === "png" || ext === "jpg" || ext === "jpeg") {
      const u = this.currentUser;
      const user__image = app
        .storage()
        .ref()
        .child(`${u.uid}/__userData/__image`);
      user__image.delete().finally(() =>
        user__image.put(image__file).then((r) =>
          r.ref.getDownloadURL().then((url) =>
            u
              .updateProfile({
                photoURL: url,
              })
              .finally(() => window.location.reload()),
          ),
        ),
      );
    } else {
      alert("Please consider uploading .png, .jpg or .jpeg image formats.");
    }
  };
  togglePasswordForm = () => {
    this.setState({ showPasswordForm: !this.state.showPasswordForm });
    $(".password-form").addClass("border");
  };

  render() {
    if (this.state.loading) return <Loading />;
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
              <div className='' id='personal-details'>
                <div
                  className='bg-light p-2 px-3  text-center rounded shadow-sm font-weight-bold'
                  style={{ color: "#5b9ecf", fontSize: "1.1em" }}>
                  Personal Details
                </div>
                {/* <hr /> */}
                <div
                  className='info-section p-3 mt-3  bg-light'
                  style={{ letterSpacing: "0.1em" }}>
                  <div>
                    <p
                      className='text-muted mb-1'
                      style={{ fontSize: "1.3em", fontWeight: "550" }}>
                      Name{" "}
                    </p>
                    <p style={{ fontSize: "1.1em" }}>Nishavak Naik</p>
                  </div>
                  <hr />
                  <div style={{}}>
                    <p
                      className='text-muted mb-1'
                      style={{ fontSize: "1.3em", fontWeight: "550" }}>
                      Initials{" "}
                    </p>
                    <p style={{ fontSize: "1.1em" }}>ASK</p>
                  </div>
                  <hr />
                  <div style={{}}>
                    <p
                      className='text-muted mb-1'
                      style={{ fontSize: "1.3em", fontWeight: "550" }}>
                      Email{" "}
                    </p>
                    <p style={{ fontSize: "1.1em" }}>abc@somaiya.edu</p>
                  </div>
                  <hr />
                  {/* <div style={{}}>
                    <p
                      className='text-muted mb-1'
                      style={{ fontSize: "1.3em", fontWeight: "550" }}>
                      Domain{" "}
                    </p>
                    <p style={{ fontSize: "1.1em" }}>AI</p>
                  </div>
                  <hr />
                  <div style={{}}>
                    <p
                      className='text-muted mb-1'
                      style={{ fontSize: "1.3em", fontWeight: "550" }}>
                      Thrust Area{" "}
                    </p>
                    <p style={{ fontSize: "1.1em" }}>Knowledge-based-systems</p>
                  </div>
                  <hr /> */}
                  <div style={{}}>
                    <p
                      className='text-muted mb-1'
                      style={{ fontSize: "1.3em", fontWeight: "550" }}>
                      isLeader{" "}
                    </p>
                    <p style={{ fontSize: "1.1em" }}>True</p>
                  </div>
                </div>

                <form className='px-3 py-2 d-none d-md-block'>
                  <label htmlFor='profilePicture'>Change profile picture</label>
                  <div
                    style={{ width: "0px", height: "0px", overflow: "none" }}>
                    <input
                      type='file'
                      name='profilePicture'
                      id='profilePicture'
                      hidden
                    />
                  </div>

                  <button type='submit' className='btn btn-success '>
                    Upload
                  </button>
                </form>

                <div className='change-password p-0 my-2 text-center'>
                  <button
                    className='btn btn-primary'
                    style={{
                      fontSize: "1.1em",
                      outline: "none",
                      boxShadow: "none",
                    }}
                    onClick={this.togglePasswordForm}>
                    Change Password
                  </button>
                  {this.state.showPasswordForm && (
                    <form
                      onSubmit={this.handleSubmit}
                      className='password-form my-2 bg-light border  col-md-9 col-12 mx-auto rounded '>
                      <div className='form-group'>
                        <p
                          id='error-msg'
                          className='p-1 mb-0 mt-2'
                          style={{ fontStyle: "italic", color: "red" }}
                        />
                        <div className='col-md-8 col-11 mx-auto'>
                          <label for='password' className='p-1 mx-1 text-muted'>
                            Enter new password
                          </label>
                          <input
                            type='password'
                            name='password'
                            placeholder='Enter the new password'
                            className='form-control border-0 p-1 m-1  mx-auto text-center shadow-sm'
                            id='password'
                            style={{ boxShadow: "none", outline: "none" }}
                          />
                        </div>

                        <div className='col-md-8 col-11 mx-auto'>
                          <label
                            className='p-1 mx-1 text-muted'
                            for='confirmed-password'>
                            Confirm password
                          </label>
                          <input
                            type='password'
                            name='confirmed-password'
                            placeholder='Confirm password'
                            className='form-control p-1  m-1  mx-auto text-center border-0 shadow-sm'
                            id='confirmed-password'
                            style={{ boxShadow: "none", outline: "none" }}
                          />
                        </div>

                        <div className='col-md-2 col-8 mx-auto'>
                          <button
                            type='submit'
                            className='btn btn-success rounded py-1 px-2 my-3 w-100'>
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default PersonalSection;
