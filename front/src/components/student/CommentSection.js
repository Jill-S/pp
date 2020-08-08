import React from "react";
import $ from "jquery";
import "./CommentSection.scss";
import Comment from "./Comment";
class CommentSection extends React.Component {
  constructor() {
    super();
    this.state = {
      comment: "",
    };
  }

  cancelComment = () => {
    $("#button-container").slideUp(400);
    $("#comment").val("");
  };

  handleChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
    e.target.value === ""
      ? $("#submit-comment").prop("disabled", true)
      : $("#submit-comment").prop("disabled", false);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    alert(this.state.comment);
    $("#comment").val("").blur();
    $("#submit-comment").prop("disabled", true);
  };

  showButtons = () => {
    $("#button-container").slideDown(400);
  };

  componentDidMount() {
    $("#comment").on("focusout", function () {
      if (this.value === "") $("#button-container").slideUp(400);
    });
    $(document).on("keydown", function (event) {
      if (event.key === "Escape")
        if ($("#comment").is(":focus")) $("#comment").blur();
    });
  }

  render() {
    return (
      <div
        id="comment-section"
        className="row bg-white shadow-sm rounded my-3 mx-auto"
      >
        <div className=" col-12 mx-auto pt-md-4 py-2 h5">
          <b className="d-block text-center">Comments</b>
        </div>
        <form
          id="comment-form"
          className="mt-3 w-100"
          onSubmit={this.handleSubmit}
        >
          <div className="form-group ml-md-auto col-12">
            <div className="justify-content-right">
              <input
                type="text"
                id="comment"
                autoComplete={"off"}
                name="comment"
                className="form-control shadow-sm"
                placeholder="Add a comment"
                onFocus={this.showButtons}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div
            id="button-container"
            style={{ display: "none" }}
            className="text-md-right"
          >
            <button
              id="reset-comment"
              type="reset"
              className="btn shadow-sm m-2"
              onClick={this.cancelComment}
            >
              Cancel
            </button>
            <button
              id="submit-comment"
              disabled={true}
              type="submit"
              className="btn shadow-sm m-2"
            >
              Comment
            </button>
          </div>
        </form>{" "}
        {/* commentSection section */}
        <div id="commentSectionByUsers" className="text-left col-12 mx-auto">
          <Comment />
          <Comment />
        </div>
      </div>
    );
  }
}
export default CommentSection;
