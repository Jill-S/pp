import React from "react";
import LoadingGIF from "./Loading.gif";

const Loading = () => {
	return (
		<div className="loading">
			<h1>Fetching data</h1>
			<div
				className="background"
				style={{ backgroundImage: `url(${LoadingGIF})` }}
			/>
		</div>
	);
};

export default Loading;
