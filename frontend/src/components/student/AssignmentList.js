import React, { Component } from "react";
import $ from "jquery";
import app from "../../Firebase";
import "./AssignmentList.scss";
import Loading from "../../Loading";
import AssignmentCard from "./AssignmentCard";
import AssignmentListGIF from "./AssignmentList.gif";
import Header from "./Header";

class AssignmentList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			assignments: [],
			loading: true,
			category: "all",
		};
		this.currentUser = app.auth().currentUser;
		this.currentUserData = null;
	}
	componentWillUnmount() {
		this.unsubscribeListener();
	}
	componentDidMount() {
		const db = app.firestore();
		db.collection("users")
			.doc(this.currentUser.uid)
			.get()
			.then((doc) => {
				this.currentUserData = doc.data();
				let group = this.currentUserData.group;
				this.unsubscribeListener = db
					.collection("assignments")
					.where("for", "==", group)
					.onSnapshot((snap) => {
						this.setState({
							assignments: [...snap.docs],
							loading: false,
						});
					});
			});
	}
	render() {
		if (this.state.loading) return <Loading />;
		return (
			<>
				<Header />
				<div id="AssignmentList" className="container pt-3">
					<ul className="nav nav-pills nav-justified nav-fill">
						<li
							className="nav-item nav-link active"
							style={{ cursor: "pointer" }}
							onClick={(event) => {
								let { target } = event;
								$("#assignment-list").fadeOut("fast", () =>
									this.setState({ category: "all" }, () => {
										$(
											".nav-item.nav-link.active"
										).removeClass("active");
										$(target).addClass("active");
										$("#assignment-list").fadeIn("fast");
									})
								);
							}}
						>
							All
						</li>
						<li
							className="nav-item nav-link"
							style={{ cursor: "pointer" }}
							onClick={(event) => {
								let { target } = event;
								$("#assignment-list").fadeOut("fast", () =>
									this.setState(
										{ category: "pending" },
										() => {
											$(
												".nav-item.nav-link.active"
											).removeClass("active");
											$(target).addClass("active");
											$("#assignment-list").fadeIn(
												"fast"
											);
										}
									)
								);
							}}
						>
							Pending
						</li>
						<li
							className="nav-item nav-link"
							style={{ cursor: "pointer" }}
							onClick={(event) => {
								let { target } = event;
								$("#assignment-list").fadeOut("fast", () =>
									this.setState(
										{ category: "turned in" },
										() => {
											$(
												".nav-item.nav-link.active"
											).removeClass("active");
											$(target).addClass("active");
											$("#assignment-list").fadeIn(
												"fast"
											);
										}
									)
								);
							}}
						>
							Turned In
						</li>
						<li
							className="nav-item nav-link"
							style={{ cursor: "pointer" }}
							onClick={(event) => {
								let { target } = event;
								$("#assignment-list").fadeOut("fast", () =>
									this.setState({ category: "draft" }, () => {
										$(
											".nav-item.nav-link.active"
										).removeClass("active");
										$(target).addClass("active");
										$("#assignment-list").fadeIn("fast");
									})
								);
							}}
						>
							Draft
						</li>
					</ul>
					<ul id="assignment-list" className="p-0">
						{this.state.assignments.length ? (
							this.state.assignments.map((assignment) =>
								this.state.category !== "all" ? (
									assignment.data().status ===
										this.state.category && (
										<AssignmentCard
											key={assignment.id}
											id={assignment.id}
											title={assignment.data().title}
											due={new Date(
												assignment.data().due.seconds *
													1000
											).toLocaleString()}
											posted={new Date(
												assignment.data().posted
													.seconds * 1000
											).toLocaleString()}
											weightage={
												assignment.data().weightage
											}
										/>
									)
								) : (
									<AssignmentCard
										key={assignment.id}
										id={assignment.id}
										title={assignment.data().title}
										due={new Date(
											assignment.data().due.seconds * 1000
										).toLocaleString()}
										posted={new Date(
											assignment.data().posted.seconds *
												1000
										).toLocaleString()}
										weightage={assignment.data().weightage}
									/>
								)
							)
						) : (
							<div className="my-5 text-center">
								<p>No assignments</p>
							</div>
						)}
					</ul>
					<div
						className="bg"
						style={{
							backgroundImage: `url(${AssignmentListGIF})`,
							filter: "blur(0.16em)",
						}}
					/>
				</div>
			</>
		);
	}
}

export default AssignmentList;
