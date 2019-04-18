import React, { Component } from "react";
import Button from "../components/Button";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Card from "../components/Card";
import { FoodPic, FoodContainer } from "./FoodPic";
import "./viewFoodStyle.css";
import SearchResults from "./SearchResults";
import "font-awesome/css/font-awesome.min.css";
//import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";
const VerifyLogin = require("../utils/VerifyLogin");
const userID = VerifyLogin.verifyUserObj();
class Food extends Component {
  state = {
    foodList: [],
    foodGroupList: [],
    foodName: "",
    foodGroupName: "",
    energy: "",
    potassium: "",
    pics: null,
    efficiency: "",
    results: [],
    foodSearch: ""
  };

  componentDidMount() {
    this.loadFoodGroupMasterAndUser(userID);
  }

  loadFood = () => {
    API.getFood()
      .then(res =>
        this.setState({
          foodList: res.data,
          foodName: "",
          foodGroupName: "",
          energy: "",
          potassium: "",
          efficiency: ""
        })
      )
      .catch(err => console.log(err));
  };

  loadFoodGroupMasterAndUser = userID => {
    API.getFoodGroupByMasterAndUser(userID)
      .then(res =>
        this.setState({
          foodList: [],
          foodGroupList: res.data,
          foodName: "",
          foodGroupName: "",
          energy: "",
          potassium: "",
          efficiency: ""
        })
      )
      .catch(err => console.log(err));
  };

  loadFoodByFoodGroupName = foodGroupName => {
    // this.findPic(foodGroupName)
    // this.setState((state, props) => {
    //   return { thumbnail: state.pics }
    // })
    console.log(this.state.thumbnail);
    API.getFoodByFoodGroupName(foodGroupName)
      .then(res =>
        this.setState({
          foodList: res.data,
          foodName: "",
          foodGroupName: "",
          energy: "",
          potassium: "",
          efficiency: ""
        })
      )
      .catch(err => console.log(err));
  };

  deleteFood = id => {
    API.deleteFood(id)
      .then(res => this.loadFood())
      .catch(err => console.log(err));
  };

  saveFoodByUser = id => {
    API.getFoodByID(id)

      .then(res => {
        console.log(res);
        API.saveFood({
          foodName: res.data.foodName,
          foodGroupName: res.data.foodGroupName,
          energy: res.data.energy,
          potassium: res.data.potassium,
          userID: userID
        })
          .then(alert(res.data.foodName + " saved as favorite food"))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  // loading foodList specific to food group on button click
  // loadFoodCards = (GroupName) => {
  //   this.state.foodGroupList.map(group => {
  //     if (group.foodGroupName == GroupName) {
  //       this.loadFoodByFoodGroupName(GroupName)
  //       console.log(GroupName, this.state.foodList, this.state.pics)
  //     }
  //   })
  // }
  //for search bar
  loadFoodOnSearch = id => {
    console.log(this.state.foodList);
    this.state.foodList.map(foodItem => {
      if (foodItem.FoodID === id) {
        console.log(foodItem);
        this.setState({ results: foodItem });
        console.log(this.state.results);
      }
    });
  };

  handleInputChange = event => {
    this.setState({ foodSearch: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("something");
    console.log(this.state.foodSearch);
    console.log(this.state.foodList);

    API.getFoodByFoodName(this.state.foodSearch)
      .then(res =>
        this.setState({
          // results: res
          foodList: res.data
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    var foodDisplay = {
      color: "#1e90ff",
      fontWeight: "bold"
    };
    var iconClass = {
      position: "absolute",
      bottom: 0,
      right: 6
    };

    return (
      <div className="container fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="text-center wow fadeInUp mt-5">
              <h5>
                Select your favorite foods
                <br />
              </h5>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6 search-bar offset-3">
            <div className="input-group mt-3 form-sm form-2 pl-0">
              <input
                className="form-control my-0 py-1 red-border"
                type="text"
                placeholder="Search for food by name"
                aria-label="Search"
                value={this.state.foodSearch}
                onChange={this.handleInputChange}
                name="foodSearch"
              />
              <div className="input-group-append">
                <button
                  className="input-group-text red lighten-3"
                  onClick={this.handleFormSubmit}
                >
                  <i className=" fa fa-search" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="container">
          <h4>Browse Common Foods By Food Group</h4>
          <hr /> */}
        <div className="row">
          <div className="col-lg-6">
            {this.state.foodGroupList.length ? (
              this.state.foodGroupList.map(foodGroupList => (
                <div className="col-lg-12">
                  <div className="container">
                    <div
                      className="holder container card"
                      onClick={() =>
                        this.loadFoodByFoodGroupName(
                          foodGroupList.foodGroupName
                        )
                      }
                    >
                      <div className="row p-2 pt-3">
                        <div className="col-4 view overlay zoom">
                          <img
                            className="card-img-left"
                            style={{ width: 95, height: 95 }}
                            alt="foodPic"
                            src={foodGroupList.image}
                          />
                        </div>
                        <div className="col-6 offset-1">
                          <button
                            key={foodGroupList.foodGroupName}
                            className="custom-btn text-center"
                          >
                            <strong>
                              <p className="card-title">
                                {" "}
                                {foodGroupList.foodGroupName}{" "}
                              </p>
                            </strong>
                          </button>
                        </div>
                      </div>
                      <div style={iconClass} className="moreIcon">
                        <p style={{ color: "blue" }}>more</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="container">
                <div class="col-lg-12">
                  <h3>No Food Groups to Display</h3>
                </div>
              </div>
            )}
          </div>

          <div className="col-lg-6">
            {this.state.foodList.length ? (
              this.state.foodList.map(foodList => (
                <div className="col-md-12">
                  <button
                    key={foodList._id}
                    onClick={() => this.saveFoodByUser(foodList._id, "")}
                    className="btn btn-light btn-lg text-left designed p-5"
                  >
                    <div className="card-content">
                      <strong>
                        <h5 style={foodDisplay}>{foodList.foodName}</h5>
                        <br />
                        Food Group: {foodList.foodGroupName} <br />
                        Energy: {foodList.energy} kCal <br />
                        Potassium: {foodList.potassium} mg <br />
                        Efficiency: {foodList.efficiency} <br />
                        Username: {foodList.userID} <br />
                      </strong>
                    </div>
                    <div className="text-right">
                      <i className="fa fa-gratipay" />
                      <br />
                      <p className="add-fav">Add to favorites</p>
                    </div>
                  </button>
                </div>
              ))
            ) : (
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <h3>No Foods To Display</h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Food;
