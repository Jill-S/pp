import React, { Component } from 'react'
import AssignmentCard from '../../student/AssignmentCard';
import './GuideAssignmentList.scss';
import $ from 'jquery';
import GuideHeader from "../Header/GuideHeader";
import AssignmentListGIF from "../../student/AssignmentList.gif";
class GuideAssignmentList extends Component {

    render() {
    // if (this.state.loading) return <Loading />;

	        return (
				<div><GuideHeader />
					<div id="AssignmentList" className="container pt-3">
		  
		  
          <ul className="nav nav-pills nav-justified nav-fill">
            <li
              className="nav-item nav-link active"
              style={{ cursor: "pointer" }}
              onClick={(event) => {
                let { target } = event;
                $("#assignment-list").fadeOut("fast", () =>
                  this.setState({ category: "all" }, () => {
                    $(".nav-item.nav-link.active").removeClass("active");
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
                  this.setState({ category: "graded" }, () => {
                    $(".nav-item.nav-link.active").removeClass("active");
                    $(target).addClass("active");
                    $("#assignment-list").fadeIn("fast");
                  })
                );
              }}
            >
              Graded
            </li>
            <li
              className="nav-item nav-link"
              style={{ cursor: "pointer" }}
              onClick={(event) => {
                let { target } = event;
                $("#assignment-list").fadeOut("fast", () =>
                  this.setState({ category: "ungraded" }, () => {
                    $(".nav-item.nav-link.active").removeClass("active");
                    $(target).addClass("active");
                    $("#assignment-list").fadeIn("fast");
                  })
                );
              }}
            >
              Ungraded
            </li>
            <li
              className="nav-item nav-link"
              style={{ cursor: "pointer" }}
              onClick={(event) => {
                let { target } = event;
                $("#assignment-list").fadeOut("fast", () =>
                  this.setState({ category: "unsub" }, () => {
                    $(".nav-item.nav-link.active").removeClass("active");
                    $(target).addClass("active");
                    $("#assignment-list").fadeIn("fast");
                  })
                );
              }}
            >
              Not Submitted yet
            </li>
          </ul>
		  <AssignmentCard />
          {/* <ul id="assignment-list" className="p-0">
            {this.state.assignments.map((assignment) =>
               this.state.category !== "all"  ? (
                assignment.data().status === this.state.category && (
                  <AssignmentCard
                    key={assignment.id}
                    id={assignment.id}
                    title={assignment.data().title}
                    due={new Date(
                      assignment.data().due.seconds * 1000
                    ).toLocaleString()}
                    posted={new Date(
                      assignment.data().posted.seconds * 1000
                    ).toLocaleString()}
                    weightage={assignment.data().weightage}
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
                    assignment.data().posted.seconds * 1000
                  ).toLocaleString()}
                  weightage={assignment.data().weightage}
                />
              )
            )}
          </ul> */}
          <div
            className="bg"
            style={{
              backgroundImage: `url(${AssignmentListGIF})`,
              filter: "blur(0.16em)",
            }}
          ></div>
        </div>
          		
				</div>
            
        )
    }
}

export default GuideAssignmentList;