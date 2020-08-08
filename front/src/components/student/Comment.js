import React, { Component } from "react";
// import app from "../../Firebase";

export class Comment extends Component {
  render() {
    return (
      <div>
        <div className="comment-box" style={{ fontFamily: "Inter" }}>
          <div
            className="commentUser my-2 p-1 d-flex flex-column align-content-center"
            id="1"
          >
            <div className="d-flex ">
              <div className="p-1">
                <img
                  src={""}
                  // src={`${app.auth().currentUser.photoURL}`}
                  className="rounded-circle"
                  width={50}
                  height={50}
                  alt="UserAvatar"
                />
              </div>
              <div className="p-2">
                <div className=" username">Student</div>
                <div className="text-muted" style={{ fontSize: "0.8em" }}>
                  6 hours ago
                </div>
              </div>
            </div>
            <div className="col-12  p-1">
              <div style={{ fontSize: "0.96em" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
                placeat corrupti amet perspiciatis voluptatum dolore reiciendis
                consequuntur tempora? Placeat a ipsam excepturi quibusdam
                molestiae modi consequuntur cum repellendus minima veritatis!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
