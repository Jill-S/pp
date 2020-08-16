import React from "react";
import LoadingGIF from "./Loading.gif";

export default function Loading() {
  return (
    <div>
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <h1>Fetching data</h1>
        <div
          className="background"
          style={{ backgroundImage: `url(${LoadingGIF})` }}
        ></div>
      </div>
    </div>
  );
}
