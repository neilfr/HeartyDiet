import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Card from "../components/Card";
import DeleteBtn from "../components/DeleteBtn";
import AddBtn from "../components/AddBtn";
import Button from "../components/Button";
import "./viewFoodStyle.css";
import "font-awesome/css/font-awesome.min.css";
// import '../node_modules/react-vis/dist/style.css';
//import 'C:\Users\gurne\OneDrive\Documents\Project3\project3\client\node_modules/'
//import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis';
const VerifyLogin = require("../utils/VerifyLogin");
const userID = VerifyLogin.verifyUserObj();

class Meal extends Component {
  state = {
    // first item from add meal
    mealName: "",
    mealList: [],
    foodList: [],
    foodFavoriteList: [],
    currentMeal: null
  };

  componentDidMount() {
    this.loadMeals(userID);
    this.loadFoodFavorites(userID);
  }

  loadFoodFavorites = userID => {
    API.getFoodByUser(userID)
      .then(res => {
        console.log("FOODFAVORITES LIST IS: ", res.data);
        this.setState({
          foodFavoriteList: res.data
        });
      })
      .catch(err => console.log(err));
  };

  loadMeals = userID => {
    API.getMealByUser(userID)
      .then(res => {
        console.log("GETMEALBYUSER RETURNED: ", res.data);
        this.setState({
          mealList: res.data,
          currentMeal: res.data[0]
        });
      })
      .catch(err => console.log(err));
  };

  selectMeal = mealId => {
    console.log("JUST GOT INTO SELECT MEAL AND MEALID IS:", mealId);
    API.getMealByID(mealId)
      .then(res => {
        console.log("GETMEALBYID RETURNED: ", res.data);
        this.setState({
          currentMeal: res.data
        });
      })
      .catch(err => console.log(err));
  };

  removeFromMeal = foodID => {
    console.log("remove food:", foodID);
    console.log("from meal:", this.state.currentMeal._id);
    API.removeFoodFromMealByID(this.state.currentMeal._id, foodID)
      .then(data => {
        console.log("food delete returned: ", data);
        // }
        // );
        const tempFoodList = data.data.foodList;
        let totalPotassium = 0;
        let totalEnergy = 0;
        tempFoodList.map(food => {
          totalPotassium += food.food.potassium;
          totalEnergy += food.food.energy;
        });
        console.log("total energy is:", totalEnergy);
        console.log("total potassium is:", totalPotassium);
        API.updateEnergyPotassiumTotalsForMealByID(
          this.state.currentMeal._id,
          totalEnergy,
          totalPotassium
        ).then(data => {
          console.log(
            "meal data after food REMOVE, with updated totals",
            data.data
          );
          this.setState({
            currentMeal: data.data
          });
        });
      })
      .catch(err => console.log(err));
  };

  //! new version
  addToMeal = (food_id, servingSize) => {
    // console.log("in addToMeal");
    // console.log("food id is:", food_id);
    // console.log("servingSize is:", servingSize);
    API.addFoodToMealByID(this.state.currentMeal._id, food_id, servingSize)
      .then(data => {
        // console.log("addFoodToMealByID data.data is", data.data);
        // console.log("foodlist is:", data.data.foodList);
        // const totalEnergy = data.data.foodList.reduce((a, b) => ({
        //   energy: a.energy + b.energy
        // }));
        // const totalPotassium = data.data.foodList.reduce((a, b) => ({
        //   potassium: a.potassium + b.potassium
        // }));
        console.log("FROM ADDFOODTOMEALBYID data.data is:", data.data);
        const tempFoodList = data.data.foodList;
        console.log("tempFoodList is:", tempFoodList);
        let totalPotassium = 0;
        let totalEnergy = 0;
        tempFoodList.map(food => {
          totalPotassium += food.food.potassium;
          totalEnergy += food.food.energy;
        });
        console.log("total energy before update totals is:", totalEnergy);
        console.log("total potassium before update totals is:", totalPotassium);
        API.updateEnergyPotassiumTotalsForMealByID(
          this.state.currentMeal._id,
          totalEnergy,
          totalPotassium
        ).then(data => {
          console.log(
            "meal data after food ADD, with updated totals",
            data.data
          );
          this.setState({
            currentMeal: data.data
          });
        });
      })
      .catch(err => console.log(err));
  };

  //next 3 functions from addMeal.js
  deleteMeal = id => {
    API.deleteMeal(id)
      .then(res => {
        console.log("res is: ", res.data);
        window.location.href = "/ViewMeal";

        // window.location.href = "/AddMeal";
        // this.setState({
        //   mealList: res.data
        // });
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log([name], value);
    // console.log(this.state.foods);
  };

  handleFormSubmit = event => {
    // alert(this.state.foods);
    event.preventDefault();
    if (this.state.mealName) {
      API.saveMeal({
        mealName: this.state.mealName,
        userID: userID,
        totalEnergy: 0,
        totalPotassium: 0
      })
        //todo this refreshes the screen... or should i update state?
        .then(res => (window.location.href = "/ViewMeal"))
        // .then(res => (window.location.href = "/AddMeal"))
        .catch(err => console.log(err));
    }
  };

  render() {
    const thumbnail = {
      width: 50,
      height: 50
    };
    // console.log(this.state.currentMeal);
    return (
      <Container fluid>
        <div className="col-6 offset-3 mb-3">
          <div className="center-block input-group mt-3 form-sm form-2 pl-0">
            <input
              className="form-control my-0 py-1 blue-border"
              type="text"
              aria-label="Search"
              value={this.state.mealName}
              onChange={this.handleInputChange}
              name="mealName"
              placeholder="Enter a meal name to create a new meal"
            />
            <div className="input-group-append">
              <button
                className="input-group-text blue"
                disabled={!this.state.mealName}
                onClick={this.handleFormSubmit}
              >
                <i className=" fa fa-plus" />
              </button>
            </div>
          </div>
        </div>

        {this.state.currentMeal ? (
          <div>
            <div className="d-flex flex-row justify-content-center mb-1">
              <h3>Current Meal</h3>
            </div>
            <div className="d-flex flex-row justify-content-center mb-3">
              <div className="p-3 pl-5 dotted-div">
                <img
                  style={thumbnail}
                  alt="icon"
                  src="https://i.imgur.com/ftEWZYQ.png"
                />
                <span className="meal-selected">
                  {" "}
                  {this.state.currentMeal.mealName}
                </span>
              </div>
              <div className="p-3 dotted-div">
                <img
                  style={thumbnail}
                  alt="icon"
                  src="https://i.imgur.com/yHfJLF8.png"
                />
                {this.state.currentMeal.totalEnergy}
              </div>
              <div className="p-3 dotted-div">
                <img
                  style={thumbnail}
                  alt="icon"
                  src="https://i.imgur.com/hbX14ue.jpg"
                />{" "}
                {this.state.currentMeal.totalPotassium} mg
              </div>
              <div className="p-3  pr-5 dotted-div">
                <img
                  style={thumbnail}
                  alt="icon"
                  src="https://i.imgur.com/g1pQW1o.jpg"
                />{" "}
                {this.state.currentMeal.efficiency}
              </div>
            </div>
          </div>
        ) : (
          <div className="row ml-5" />
        )}

        <div className="row">
          <div className="col-3 ml-5">
            <div className=" justify-content-center">
              <h3 className="text-center">Select Meal</h3>
              <hr />
            </div>
            <Row>
              {this.state.mealList.length ? (
                <>
                  <ul className="list-group list-group-flush">
                    <ul className="list-group">
                      {this.state.mealList.map(meal => (
                        <li className="list-group-item" key={meal._id}>
                          <div className="row">
                            <div className="col-2">
                              <div className="col-12">
                                <button
                                  role="button"
                                  className="btn px-3 text-center blue-gradient "
                                  onClick={() => this.selectMeal(meal._id)}
                                >
                                  <div style={{ textAlign: "center" }}>
                                    <i className="fa fa-check-circle fa-2x" />
                                  </div>
                                </button>
                              </div>
                              <div className="col-12">
                                <button
                                  role="button"
                                  className="btn px-3 text-center peach-gradient "
                                  onClick={() => this.deleteMeal(meal._id)}
                                >
                                  <div style={{ textAlign: "center" }}>
                                    <i className="fa fa-minus-circle fa-2x" />
                                  </div>
                                </button>
                              </div>
                            </div>
                            <div className="col-8 offset-2">
                              <strong>
                                <h5 style={{ fontWeight: "bolder" }}>
                                  {" "}
                                  <span className="meal-selected">
                                    {meal.mealName}
                                  </span>{" "}
                                </h5>
                                <span className="spanIt">Energy:</span>{" "}
                                {meal.totalEnergy} kCal <br />
                                <span className="spanIt"> Potassium:</span>{" "}
                                {meal.totalPotassium} mg
                                <br />
                                <br />
                              </strong>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </ul>
                </>
              ) : (
                <div className="justify-content-center">
                  <h6 className="text-center">No Meals, Add a meal first</h6>
                </div>
              )}
            </Row>
          </div>

          <div className="col-3 offset-1">
            <div className="justify-content-center ml-3">
              <h3 className="text-center">Meal Contains</h3>
              <hr />
            </div>

            <Row>
              {this.state.currentMeal &&
              this.state.currentMeal.foodList.length > 0 ? (
                <ul className="list-group list-group-flush">
                  <ul className="list-group">
                    {this.state.currentMeal.foodList.map(food => (
                      <li className="list-group-item" key={food._id}>
                        <div className="row">
                          <div className="col-2 mt-5">
                            <button
                              className="btn px-3 text-center peach-gradient "
                              onClick={() => this.removeFromMeal(food._id)}
                            >
                              <div style={{ textAlign: "center" }}>
                                <i className="fa fa-minus-circle fa-2x" />
                              </div>
                            </button>
                          </div>
                          <div className="col-8 offset-2">
                            <strong>
                              <h5 style={{ fontWeight: "bolder" }}>
                                {food.food.foodName}
                              </h5>
                              <span className="spanIt">Energy:</span>{" "}
                              {food.food.energy} kCal
                              <br />
                              <span className="spanIt">Potassium:</span>{" "}
                              {food.food.potassium} mg <br />
                              <span className="spanIt"> ServingSize:</span>{" "}
                              {food.servingSize} g
                              <br />
                              <span className="spanIt"> Efficiency:</span>{" "}
                              {food.food.efficiency} <br />
                            </strong>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ul>
              ) : (
                <h6>Click Add on a food item to add it to your meal</h6>
              )}
            </Row>
          </div>

          <div className="col-3 offset-1">
            <div className="justify-content-center ml-3">
              <h3 className="text-center">Add To Meal</h3>
              <hr />
            </div>

            <Row>
              {this.state.foodFavoriteList.length ? (
                <ul className="list-group list-group-flush">
                  <ul className="list-group">
                    {this.state.foodFavoriteList.map(food => (
                      <li className="list-group-item" key={food._id}>
                        <div className="row">
                          <div className="col-2 mt-5">
                            <button
                              role="button"
                              type="button"
                              className="btn px-3 text-center blue-gradient "
                              onClick={() => this.addToMeal(food._id, 100)}
                            >
                              <div style={{ textAlign: "center" }}>
                                <i className="fa fa-plus-circle fa-2x" />
                              </div>
                            </button>
                          </div>
                          <div className="col-8 offset-2">
                            <strong>
                              <h5 style={{ fontWeight: "bolder" }}>
                                {food.foodName}{" "}
                              </h5>
                              <span className="spanIt">Energy:</span>{" "}
                              {food.energy} kCal <br />
                              <span className="spanIt">Potassium:</span>{" "}
                              {food.potassium} mg <br />
                              <span className="spanIt">Efficiency:</span>{" "}
                              {food.efficiency} <br />
                            </strong>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ul>
              ) : (
                <div className="justify-content-center ml-5">
                  <h6>Click Add to add a food to the meal</h6>
                </div>
              )}
            </Row>
          </div>
        </div>
      </Container>
    );
  }
}

export default Meal;
