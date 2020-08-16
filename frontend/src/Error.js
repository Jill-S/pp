import React from "react";
import app from "./Firebase";

const Error = () => {
  return (
    <div className="Error vh-100 noselect d-flex align-items-center justify-content-center flex-column">
      <h1>Error</h1>
      <p>Please contact administrator</p>
      <button className="btn btn-light" onClick={() => app.auth().signOut()}>
        Sign out
      </button>
    </div>
  );
};

export default Error;
