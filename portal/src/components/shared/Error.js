import React from "react";
import axios from "../../axios";

export default function Error() {
  const signOut = () =>
    axios.get("signOut/").then(() => {
      window.location.reload();
    });
  return (
    <div>
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1>Error</h1>
        <p>Please contact administrator.</p>
        <button className="btn btn-light" onClick={signOut}>
          Sign out
        </button>
      </div>
    </div>
  );
}
