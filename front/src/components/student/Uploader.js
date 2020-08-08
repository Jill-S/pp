import React, { Component } from "react";
import $ from "jquery";

// * Uploader returns a button.

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputId: 0,
      files: [],
    };
  }

  /* 
  
  Removing an item sets File to {} in the FileList.
  While submitting, retrieve all not null objects and POST.

  */

  removeItem = (inputId, key) => {
    let files = this.state.files;
    // ! if used splice then index may not match. Shifting of array issue arises.
    let toRemoveInput = Array.from(files[inputId]);
    toRemoveInput[key] = {};
    files[inputId] = toRemoveInput;
    this.setState({
      files: files,
    });
  };

  createListItem = (name, inputId, key) => {
    let that = this;
    return $("<li>", {
      class:
        "list-group-item border-0 rounded-0 d-flex justify-content-between align-items-center m-0",
    })
      .append(
        $("<span>", {
          text: name,
        })
      )
      .append(
        $("<i>", {
          class: "fa fa-close",
          role: "button",
        }).on("click", function () {
          that.removeItem(inputId, key);
          $(this).parent().remove();
        })
      );
  };

  addInput = (type) => {
    const that = this;
    let inputId = this.state.inputId;

    // create input files selection
    if (type === "files")
      $("#uploadFilesInputContainer").append(
        $("<input>", {
          class: "form-control-file",
          type: "file",
          multiple: true,
          inputId: inputId,
          // webkitdirectory: true,
        })
      );

    // create input folder selection
    if (type === "folder")
      $("#uploadFilesInputContainer").append(
        $("<input>", {
          class: "form-control-file",
          type: "file",
          multiple: true,
          inputId: inputId,
          webkitdirectory: true,
        })
      );

    // ! states should not be directly altered
    // initialise files[inputId] with {}
    let files = this.state.files;
    files[inputId] = {};
    this.setState({
      files: files,
    });

    // update List and state on change
    $(`[inputId="${inputId}"]`)
      .trigger("click")
      .on("change", function () {
        let currentInput = this;
        let files = that.state.files;

        // * updating files in state with new entries
        files[inputId] = currentInput.files;
        that.setState({
          files: files,
        });

        // update file List visible to the user
        for (let i = 0; i < currentInput.files.length; i++) {
          const file = currentInput.files[i];
          $("#uploadFilesList").append(
            that.createListItem(file.name, inputId, i)
          );
        }
      });

    //   increment inputId
    this.setState({
      inputId: this.state.inputId + 1,
    });
  };

  getUploadList = () => {
    // * uploadList is the list to be uploaded
    let uploadList = [];
    for (let i = 0; i < this.state.files.length; i++) {
      const fileList = this.state.files[i];
      let fileListArr = Array.from(fileList);
      for (let j = 0; j < fileListArr.length; j++) {
        const file = fileListArr[j];
        if (!$.isEmptyObject(file)) {
          uploadList.splice(0, 0, file);
        }
      }
    }
    // ! issue: removing duplicates with same keys but different directories
    // ! if __init__.py is to be included, there could be multiple of them but from different directories.
    // let cleanedUploadList = _.uniqWith(uploadList, _.isEqual);
    // let cleanedUploadList = _.uniqBy(uploadList, ["name", "size"]);
    // * google allows duplicates

    return uploadList; // returns file List with duplicates
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.getUploadList().length) {
      alert("Blank Submission");
    } else {
      console.log(this.getUploadList());
      alert(`Upload these ${this.getUploadList().length} files?`);
      this.props.assignmentStatus("Submitted");
    }
  };

  render() {
    return (
      <div>
        {/* toggler */}
        <button
          type="button"
          className="btn btn-light shadow-sm"
          data-toggle="modal"
          data-target="#Uploader"
        >
          Attach Files
        </button>
        {/* Modal */}
        <div className="modal fade" id="Uploader" tabIndex="-1">
          <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header bg-light border-0">
                <div className="modal-title text-center w-100 h3 font-weight-bold">
                  Upload Files
                </div>
              </div>
              <form
                id="filesToBeUploadedForm"
                autoComplete="off"
                onSubmit={this.handleSubmit}
                className="d-flex flex-column h-100"
                style={{ minHeight: "80vh" }}
              >
                <div className="modal-body flex-shrink-1">
                  <div className="row">
                    <div
                      id="uploadFilesInputContainer"
                      className="form-group"
                      hidden
                    ></div>
                    <ul
                      className="form-group list-group list-group-flush w-100 mx-auto"
                      id="uploadFilesList"
                    ></ul>
                  </div>
                </div>
                <div className="modal-footer mt-auto py-3 border-0 bg-light row justify-content-around">
                  <button
                    type="button"
                    className="btn btn-primary shadow-sm"
                    onClick={() => this.addInput("files")}
                  >
                    Attach Files
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger shadow-sm"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-info shadow-sm"
                    onClick={() => this.addInput("folder")}
                  >
                    Attach Folder
                  </button>
                  <button
                    type="submit"
                    id="filesToBeUploadedSubmit"
                    hidden
                    className="btn btn-success shadow-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Uploader;
