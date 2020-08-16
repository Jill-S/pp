import React from "react";
import GuideHeader from "./Header/GuideHeader";
import $ from "jquery";
//import "./PersonalSection.scss";
import app from "../../Firebase";
//import Loading from "../../../Loading";
//import Croppie from "croppie/croppie.js";
import "croppie/croppie.css";

class Profile extends React.Component{
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

  componentDidMount() {
    // const croppie__instance = new Croppie(
    //   document.getElementById("croppie__test"),
    //   {
    //     viewport: {
    //       width: 200,
    //       height: 200,
    //       type: "square",
    //     },
    //     boundary: {
    //       width: 300,
    //       height: 300,
    //     },
    //     enableZoom: false,
    //   },
    // );
    // const avatar = app.auth().currentUser.photoURL;
    // croppie__instance.result((data) => console.log(data));
  }
  render(){
    return(
      <div className="profile">
      <GuideHeader />
        <br />
        <div className="mx-auto" style={{width:"90%"}}>
      <div
        className="p-2 text-center shadow-sm rounded font-weight-bold  mx-auto"
        style={{
          color: "rgb(183, 32, 46)",
          fontSize: "1.1em",
          width: "auto",
          backgroundColor: "rgba(231, 231, 231, 0.459)"
        }}
      >
        Profile
      </div>
      <br />
      <div className='info-section p-3 mt-  bg-'>
          <div>
            <p
              className='text- mb-1'
              style={{ fontSize: "", fontWeight: "550" }}>
              Name{" "}
            </p>
            <p className='select' style={{ fontSize: "" }}>
              {this.titleCase(app.auth().currentUser.displayName)}
            </p>
          </div>
          {/* <hr /> */}
          
          {/* <hr /> */}
          <div style={{}}>
            <p
              className='text- mb-1'
              style={{ fontSize: "", fontWeight: "550" }}>
              Email id{" "}
            </p>
            <p className='select' style={{ fontSize: "" }}>
              {app.auth().currentUser.email}
            </p>
          </div>
        </div>
        <form className='p-3'>
          <label htmlFor='profilePicture' className='btn btn-dark'>
            Change profile picture
          </label>
          <input
            type='file'
            name='profilePicture'
            id='profilePicture'
            accept={[".jpg", ".jpeg", ".png"]}
            hidden
            onChange={this.uploadImage}
          />
        </form>
        <div className='form-group d-none'>
          <div id='croppie__test'></div>
          <img
            src={app.auth().currentUser.photoURL}
            alt=''
            // id='croppie__test'
            style={{ width: "3em", height: "3em" }}
          />
        </div>
        <div className='change-password p-3 text-'>
          <button
            className='btn btn-primary'
            style={{ fontSize: "1.1em", outline: "none", boxShadow: "none" }}
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
    );
  }
}

export default Profile;