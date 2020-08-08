import React from "react";
import LoadingImage from "./Loading.gif";
import "./Loading.css";

export default function Loading() {
  return (
    <div>
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <h1>Fetching data</h1>
        <div
          className="background"
          style={{ backgroundImage: `url(${LoadingImage})` }}
        ></div>
      </div>
    </div>
  );
}
