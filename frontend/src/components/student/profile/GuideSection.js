import React from "react";
import $ from "jquery";
class PersonalSection extends React.Component {
  constructor() {
    super();
    this.state = {
      hasGuide: false,
      searchValue: "",
      guideList: ["abc", "def", "ghi", "hij", "mno"],
      sentRequests: JSON.parse(localStorage.getItem("requestList")) || [],
    };
  }

  //   filterNames = (e) =>{
  //     let input = document.getElementById('search-bar');
  //     // this.setState('searchValue',input);
  //     let i;
  //     let filter = input.value.toUpperCase();
  //     // let div = document.getElementById("myDropdown");
  //     let li = document.getElementsByTagName("li");
  //     for (i = 0; i < li.length; i++) {
  //       let txtValue = li[i].textContent || li[i].innerText;
  //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //       $('#search-list').removeClass('d-none');
  //       li[i].classList.remove('d-none');
  //     }
  //     else{
  //       $('#search-list').addClass('d-none');
  //     }
  //   }
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    let requestList = this.state.sentRequests;
    let searchQuery = document.getElementById("search-bar").value;
    console.log(searchQuery);
    if (requestList.includes(searchQuery)) {
      alert("Request to " + searchQuery + " has already been sent");
    } else if (searchQuery === "") {
      alert("Empty string !");
    } else {
      requestList.push(searchQuery);
      this.setState({ sentRequests: requestList });
      localStorage.setItem(
        "requestList",
        JSON.stringify(this.state.sentRequests)
      );
    }
    document.getElementById("search-bar").value = "";
  };

  cancelRequest = (e, item) => {
    const that = this;
    let sentRequests = Array.from(that.state.sentRequests);
    sentRequests.splice(sentRequests.indexOf(item), 1);
    this.setState(
      {
        sentRequests: sentRequests,
      },
      function () {
        localStorage.setItem("requestList", JSON.stringify(sentRequests));
      }
    );
  };

  createSearchedDiv = (item) => {
    const that = this;
    return (
      <div className="col-12 mx-auto">
        <div
          className=" w-50 mx-auto border row  bg-white p-2 m-1"
          style={{ borderRadius: "1.2em" }}
        >
          <div className="col-6 p-0  m-auto">
            <img
              src="/assets/images/user.jpeg"
              alt="guide avatar"
              className="w-50 shadow-sm rounded-circle"
            />
          </div>
          <div className="col-6 m-0 p-0 ">
            <p className="py-2 " style={{ fontSize: "1.1em" }}>
              {item}
            </p>
            <button
              className="btn btn-danger my-2"
              style={{ outline: "0", boxShadow: "none" }}
              onClick={(e) => that.cancelRequest(e, item)}
            >
              Cancel Request
            </button>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div className="">
        <div
          className="bg-light p-2 px-3 text-center shadow-sm rounded font-weight-bold"
          style={{ color: "#5b9ecf", fontSize: "1.1em" }}
        >
          Guide Details
        </div>
        {this.state.hasGuide ? (
          <div>
            <img
              src="../../../public/assets/images/user.jpeg"
              alt="guide profile pic "
            />
            <p>Guide Name : abc</p>
            <p>Guide Email : abc@gmail.com</p>
            <p>Deparment Name : IT</p>
            <p>Post : Professor</p>
            <p>Already of a guide of x groups</p>
          </div>
        ) : (
          <div className="bg-light p-1 mt-3" style={{ minHeight: "70vh" }}>
            <div className="text-secondary">
              <p
                className="text-center mb-0 font-weight-bold"
                style={{ fontSize: "1.8em" }}
              >
                Oops ... Looks like you don't have a guide yet{" "}
              </p>
              <p className="text-center" style={{ fontSize: "1.1em" }}>
                Search for and send requests to the guide{" "}
              </p>
            </div>
            <form hidden={this.state.sentRequests.length}>
              <div className="row d-flex offset-1 align-content-center justify-content-center mx-auto">
                <div className="col-8 m-0 p-0 pb-1">
                  <input
                    type="text"
                    className="form-control w-100 m-0 border-0 shadow-sm"
                    id="search-bar"
                    placeholder="Search here ..."
                    name="search" /* onKeyUp = {this.filterNames} */
                    style={{ outline: "none", boxShadow: "none" }}
                  />
                </div>
                <div className="col-2 m-0 p-0 pb-1">
                  <button
                    className="btn"
                    type="submit"
                    onClick={this.handleSubmit}
                    style={{ outline: "none", boxShadow: "none" }}
                  >
                    <i
                      class="fa fa-paper-plane"
                      aria-hidden="true"
                      style={{ transform: "rotate(58deg)" }}
                    />
                  </button>
                </div>
              </div>
            </form>

            <div className="text-center">
              <hr />
              <p className="lead">Sent Request </p>
              <hr />
              {this.state.sentRequests.map(this.createSearchedDiv)}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default PersonalSection;
