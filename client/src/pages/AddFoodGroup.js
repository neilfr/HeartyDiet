import React, { Component } from "react";
//import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn, Dropdown } from "../components/Form";
//import Button from "../components/Button";
const VerifyLogin = require("../utils/VerifyLogin");
const userID = VerifyLogin.verifyUserObj();

class FoodGroup extends Component {
  state = {
    foodGroupName: "",
    foodGroupList: "",
    pic: null
  };

  componentDidMount() {
    this.loadFoodGroupByMasterAndUser(userID);
  }

  verifyLogin = () => {
    let userObj = JSON.parse(localStorage.getItem("userObj"));
    if (userObj === null || userObj.Token === null || userObj.Token === "") {
      //REDIRCT THEM TO LOGIN
      window.location.href = "./";
    }
    {
      this.setState({
        userID: userObj.Token
      });
    }
  };

  loadFoodGroupByMasterAndUser = userID => {
    API.getFoodGroupByMasterAndUser(userID)
      .then(res =>
        this.setState({
          foodGroupName: "",
          foodGroupList: res.data
        })
      )
      .catch(err => console.log(err));
  };

  // deleteFood = id => {
  //   API.deleteFood(id)
  //     .then(res => this.loadFood())
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.foodGroupName) {
      // this.findPic(this.state.foodGroupName);
      API.saveFoodGroup({
        foodGroupName: this.state.foodGroupName,
        userID: userID
      })

        .then(res => this.loadFoodGroupByMasterAndUser(userID))
        .catch(err => console.log(err));
    }
  };

  findPic = name => {
    API.getRecipes(name)
      .then(res => {
        const ImgRec = res.data.results.filter(recipe =>
          Boolean(recipe.thumbnail)
        );
        this.setState({ pics: ImgRec.length > 0 ? ImgRec[0].thumbnail : null });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Container fluid>
          <Row>
            <Col size="md-12 sm-12">
              <div className="text-center wow fadeInUp mt-5">
                <h2>Add Food Group</h2>
                <br />
                <h5>
                  Use this screen to create a custom food group that is not part
                  of the original master list. <br />
                  <br />
                </h5>
              </div>
            </Col>
          </Row>
        </Container>

        <Row>
          <div className="col-lg-6 offset-6 ">
            <div className="input-group mt-3 form-sm form-2 p-5">
              <input
                className="form-control my-0 py-1 red-border"
                value={this.state.foodGroupName}
                onChange={this.handleInputChange}
                name="foodGroupName"
                placeholder="Enter Food Group Name"
              />
              <div className="input-group-append">
                <button
                  className="input-group-text red lighten-3"
                  disabled={!this.state.foodGroupName}
                  onClick={this.handleFormSubmit}
                >
                  <i className=" fa fa-plus" />
                </button>
              </div>
            </div>
          </div>
          {this.state.foodGroupList.length ? (
            this.state.foodGroupList.map(foodGroupList => (
              <Col size="lg-4">
                <Container>
                  <div
                    className="container card mt-2 mb-3"
                    onClick={() =>
                      this.loadFoodByFoodGroupName(foodGroupList.foodGroupName)
                    }
                  >
                    {/* {console.log(foodGroupList.image)} */}
                    {/* <div className="card" style={{ width: 35 }}> */}
                    <div className="row p-2 pt-3">
                      <div className="col-4 view overlay zoom">
                        {foodGroupList.image ? (
                          <img
                            className="card-img-left"
                            style={{ width: 95, height: 95 }}
                            alt="groupImg"
                            src={foodGroupList.image}
                          />
                        ) : (
                            <img
                              className="card-img-left"
                              style={{ width: 95, height: 95 }}
                              alt="groupImg"
                              src="https://via.placeholder.com/95"
                            />
                          )}

                        {/* <Col size="md-6" className="card-body"> */}
                      </div>
                      <div className="col-6 offset-1">
                        <button
                          key={foodGroupList.foodGroupName}
                          y
                          className="custom-btn text-center"
                        >
                          {/* <Link to={"/food/" + food._id}></Link> */}
                          <strong>
                            <p className="card-title">
                              {" "}
                              {foodGroupList.foodGroupName}{" "}
                            </p>
                          </strong>
                        </button>
                      </div>
                    </div>
                  </div>
                </Container>
              </Col>
            ))
          ) : (
              <h3>No Results to Display1</h3>
            )}
          {/* </Col> */}
        </Row>
      </Container>
    );
  }
}

export default FoodGroup;
