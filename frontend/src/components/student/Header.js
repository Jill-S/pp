import React, { Component } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import app from "../../Firebase";
import SomaiyaLogo from "../../media/Somaiya.svg";
import UserAvatar from "../../media/User.png";

class Header extends Component {
	render() {
		return (
			<div className="sticky-top">
				<div id="Header" className="navbar bg-white shadow-sm noselect">
					<Link to="/" className="navbar-brand">
						<img
							src={SomaiyaLogo}
							style={{ height: "2em" }}
							alt="Home"
						/>
					</Link>
					<div className="dropdown">
						<img
							src={
								app.auth().currentUser.photoURL ||
								`${UserAvatar}`
							}
							className="rounded-circle dropdown-toggle shadow-sm"
							data-toggle="dropdown"
							alt={`${app.auth().currentUser.displayName}`}
							style={{
								cursor: "pointer",
								width: "3em",
								height: "3em",
							}}
						/>
						<div className="dropdown-menu py-2 dropdown-menu-right shadow-sm border-0">
							<Link to="/assignment-list">
								<div className="dropdown-item">
									<i className="fa fa-folder fa-fw mr-2" />
									Assignments
								</div>
							</Link>
							<Link
								to="/profile/personal-section"
								className="dropdown-item"
							>
								<i className="fa fa-user fa-fw mr-2" />
								Profile
							</Link>
							<div
								className="dropdown-item"
								onClick={() => app.auth().signOut()}
							>
								<i className="fa fa-lock fa-fw mr-2" />
								Sign out
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;
