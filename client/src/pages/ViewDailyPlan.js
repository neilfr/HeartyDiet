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

const VerifyLogin = require("../utils/VerifyLogin");
const userID = VerifyLogin.verifyUserObj();

class DailyPlan extends Component {
  state = {
    dailyPlanName: "",
    dailyPlanList: [],
    mealList: [],
    dailyPlanMealList: [],
    currentDailyPlan: null
  };

  componentDidMount() {
    this.loadDailyPlans(userID);
    this.loadMealList(userID);
  }
  loadMealList = userID => {
    API.getMealByUser(userID)
      .then(res => {
        console.log("mealList is: ", res.data);
        this.setState({
          mealList: res.data
        });
      })
      .catch(err => console.log(err));
  };

  loadDailyPlans = userID => {
    API.getDailyPlanByUser(userID)
      .then(res => {
        console.log("getDailyPlanByUser returned: ", res.data);
        this.setState({
          dailyPlanList: res.data,
          currentDailyPlan: res.data[0]
        });
      })
      .catch(err => console.log(err));
  };

  selectDailyPlan = dailyPlanId => {
    console.log(
      "JUST GOT INTO SELECT DAILYPLAN AND DAILYPLANID IS:",
      dailyPlanId
    );
    API.getDailyPlanByID(dailyPlanId)
      .then(res => {
        console.log("GETDAILYBPLANBYID RETURNED: ", res.data);
        this.setState({
          currentDailyPlan: res.data
        });
      })
      .catch(err => console.log(err));
  };

  // console.log("selectDailyPlan dailyplan is : " + dailyPlan);
  // console.log(dailyPlan);
  //   this.setState({ currentDailyPlan: dailyPlan });
  //   console.log(
  //     "selected dailyPlan... now current dailyPlan state is:",
  //     this.state.currentDailyPlan
  //   );

  //   var mealListArray = [];
  //   dailyPlan.mealList.map(mealID =>
  //     API.getMealByID(mealID)
  //       .then(res => {
  //         console.log("mealListArray element is: ", res.data);

  //         mealListArray.push(res.data);

  //         this.setState({
  //           dailyPlanMealList: mealListArray
  //         });
  //       })
  //       .catch(err => console.log(err))
  //   );
  // };

  removeFromDailyPlan = mealID => {
    console.log("remove meal:", mealID);
    console.log("from dailyPlan:", this.state.currentDailyPlan._id);
    API.removeMealFromDailyPlanByID(this.state.currentDailyPlan._id, mealID)
      .then(data => {
        console.log("meal delete returned: ", data);
        // }
        // );
        const tempMealList = data.data.mealList;
        let totalPotassium = 0;
        let totalEnergy = 0;

        console.log("tempMealList", tempMealList);
        tempMealList.map(meal => {
          totalPotassium += meal.meal.totalPotassium;
          totalEnergy += meal.meal.totalEnergy;
        });
        console.log("total energy is:", totalEnergy);
        console.log("total potassium is:", totalPotassium);
        API.updateEnergyPotassiumTotalsForDailyPlanByID(
          this.state.currentDailyPlan._id,
          totalEnergy,
          totalPotassium
        ).then(data => {
          console.log(
            "dailyPlan data after meal REMOVE, with updated totals",
            data.data
          );
          this.setState({
            currentDailyPlan: data.data
            // dailyPlanMealList: data.data.mealList
          });

          console.log(this.state.dailyPlanMealList);
        });
      })
      .catch(err => console.log(err));
  };

  //! new version
  addToDailyPlan = meal_id => {
    // console.log("in addToDailyPlan");
    // console.log("meal id is:", meal_id);
    // console.log("servingSize is:", servingSize);
    API.addMealToDailyPlanByID(this.state.currentDailyPlan._id, meal_id)
      .then(data => {
        // console.log("addMealToDailyPlanByID data.data is", data.data);
        // console.log("meallist is:", data.data.mealList);
        // const totalEnergy = data.data.mealList.reduce((a, b) => ({
        //   energy: a.energy + b.energy
        // }));
        // const totalPotassium = data.data.mealList.reduce((a, b) => ({
        //   potassium: a.potassium + b.potassium
        // }));
        console.log("data.data is:", data.data);
        let tempMealList = data.data.mealList;
        console.log("tempMealList is:", tempMealList);
        let totalPotassium = 0;
        let totalEnergy = 0;
        tempMealList.map(meal => {
          totalPotassium += meal.meal.totalPotassium;
          totalEnergy += meal.meal.totalEnergy;
        });
        console.log("total energy before update totals is:", totalEnergy);
        console.log("total potassium before update totals is:", totalPotassium);
        API.updateEnergyPotassiumTotalsForDailyPlanByID(
          this.state.currentDailyPlan._id,
          totalEnergy,
          totalPotassium
        ).then(data => {
          console.log(data);
          console.log(
            "dailyPlan data after meal ADD, with updated totals",
            data.data
          );

          this.setState({
            currentDailyPlan: data.data
          });

          //     var mealListArray = [];
          //     data.data.mealList.map(mealID =>
          //       API.getMealByID(mealID)
          //         .then(res => {
          //           console.log("mealListArray element is: ", res.data);

          //           mealListArray.push(res.data);

          //           this.setState({
          //             dailyPlanMealList: mealListArray
          //           });
          //         })
          //         .catch(err => console.log(err))
          //     );
        });
      })
      .catch(err => console.log(err));
  };
  //next 3 functions from addDailyPlan.js
  deleteDailyPlan = id => {
    API.deleteDailyPlan(id)
      .then(res => {
        console.log("res is: ", res.data);
        window.location.href = "/ViewDailyPlan";

        // window.location.href = "/AddDailyPlan";
        // this.setState({
        //   dailyPlanList: res.data
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
    // console.log(this.state.meals);
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.dailyPlanName) {
      API.saveDailyPlan({
        dailyPlanName: this.state.dailyPlanName,
        userID: userID,
        totalEnergy: 0,
        totalPotassium: 0
      })
        //todo this refreshes the screen... or should i update state?
        .then(res => (window.location.href = "/ViewDailyPlan"))
        // .then(res => (window.location.href = "/AddDailyPlan"))
        //.then(res => this.loadDailyPlans())
        .catch(err => console.log(err));
    }
  };

  render() {
    const thumbnail = {
      width: 50,
      height: 50
    };
    return (
      <Container fluid>
        <div className="col-6 offset-3 mb-5">
          <div className="center-block input-group mt-3 form-sm form-2 pl-0">
            <input
              className="form-control my-0 py-1 blue-border"
              type="text"
              aria-label="Search"
              value={this.state.dailyPlanName}
              onChange={this.handleInputChange}
              name="dailyPlanName"
              placeholder="Enter a name to create a new daily plan"
            />
            <div className="input-group-append">
              <button
                className="input-group-text blue"
                disabled={!this.state.dailyPlanName}
                onClick={this.handleFormSubmit}
              >
                <i className=" fa fa-plus" />
              </button>
            </div>
          </div>
        </div>
        {this.state.currentDailyPlan ? (
          <div>
            <div className="d-flex flex-row justify-content-center mb-1">
              <h3>Current Daily Plan</h3>
            </div>
            <div className="d-flex flex-row justify-content-center mb-5 ">
              <div className="p-3 pl-5 dotted-div">
                <img
                  style={thumbnail}
                  alt="icon"
                  src="https://i.imgur.com/ftEWZYQ.png"
                />
                <span className="meal-selected">
                  {" "}
                  {this.state.currentDailyPlan.dailyPlanName}
                </span>
              </div>
              <div className="p-3 dotted-div">
                <img
                  style={thumbnail}
                  alt="icon"
                  src="https://i.imgur.com/yHfJLF8.png"
                />
                {this.state.currentDailyPlan.totalEnergy}
              </div>
              <div className="p-3 pr-5 dotted-div">
                <img
                  style={thumbnail}
                  alt="icon"
                  src="https://i.imgur.com/hbX14ue.jpg"
                />
                {this.state.currentDailyPlan.totalPotassium} mg
              </div>
            </div>
          </div>
        ) : (
          // <div className="row">
          //   <h6 className="col-4 offset-8 mb-3 text-justify" />
          // </div>
          <div className="row ml-5" />
        )}
        {/* done */}
        {/* <Row>
          <Col size="md-4 sm-4"> */}
        <div className="row">
          <div className="col-3 ml-5">
            {/* <div className="container"> */}
            <div className=" justify-content-center">
              <h3 className="text-center">Select Daily Plan</h3>
              <hr />
            </div>
            <Row>
              {this.state.dailyPlanList.length ? (
                <>
                  <ul className="list-group list-group-flush">
                    <ul className="list-group">
                      {/* <> */}
                      {this.state.dailyPlanList.map(dailyPlan => (
                        <li className="list-group-item" key={dailyPlan._id}>
                          <div className="row">
                            <div className="col-2">
                              <div className="col-12">
                                <button
                                  role="button"
                                  className="btn px-3 text-center blue-gradient "
                                  onClick={() =>
                                    this.selectDailyPlan(dailyPlan._id)
                                  }
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
                                  onClick={() =>
                                    this.deleteDailyPlan(dailyPlan._id)
                                  }
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
                                    {dailyPlan.dailyPlanName}
                                  </span>{" "}
                                </h5>
                                <span className="spanIt">Energy:</span>{" "}
                                {dailyPlan.totalEnergy} kCal <br />
                                <span className="spanIt"> Potassium:</span>{" "}
                                {dailyPlan.totalPotassium} mg
                                <br /> <br />
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
                  <h6>No DailyPlans, Add a dailyPlan first</h6>
                </div>
              )}
            </Row>
          </div>
          {/* STOP HERE */}
          <div className="col-3 offset-1">
            <div className="justify-content-center ml-3">
              <h3 className="text-center">Meals in your Daily Plan</h3>
              <hr />
            </div>

            <Row>
              {this.state.currentDailyPlan &&
              this.state.currentDailyPlan.mealList.length > 0 ? (
                <ul className="list-group list-group-flush">
                  <ul className="list-group">
                    {this.state.currentDailyPlan.mealList.map(meal => (
                      <li className="list-group-item" key={meal._id}>
                        <div className="row">
                          <div className="col-2 mt-5">
                            <button
                              className="btn px-3 text-center peach-gradient "
                              onClick={() => this.removeFromDailyPlan(meal._id)}
                            >
                              <div style={{ textAlign: "center" }}>
                                <i className="fa fa-minus-circle fa-2x" />
                              </div>
                            </button>
                          </div>
                          <div className="col-8 offset-2">
                            <strong>
                              <h5 style={{ fontWeight: "bolder" }}>
                                {meal.meal.mealName}
                              </h5>
                              <span className="spanIt">Energy:</span>{" "}
                              {meal.meal.totalEnergy} kCal
                              <br />
                              <span className="spanIt">Potassium:</span>{" "}
                              {meal.meal.totalPotassium} mg <br />
                              {/* <br /> ServingSize:{meal.servingSize}
                          <br /> */}
                              <span className="spanIt"> Efficiency:</span>{" "}
                              {meal.meal.efficiency} <br />
                            </strong>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ul>
              ) : (
                <h6>Click Add on a meal card to add it to your dailyPlan</h6>
              )}
            </Row>
          </div>

          <div className="col-3 offset-1">
            <div className="justify-content-center ml-3">
              <h3 className="text-center">Add To Daily Plan</h3>
              <hr />
            </div>
            <Row>
              {this.state.mealList.length ? (
                <ul className="list-group list-group-flush">
                  <ul className="list-group">
                    {this.state.mealList.map(meal => (
                      <li className="list-group-item" key={meal._id}>
                        <div className="row">
                          <div className="col-2 mt-5">
                            <button
                              role="button"
                              type="button"
                              className="btn px-3 text-center blue-gradient"
                              onClick={() => this.addToDailyPlan(meal._id)}
                            >
                              <div style={{ textAlign: "center" }}>
                                <i className="fa fa-plus-circle fa-2x" />
                              </div>
                            </button>
                          </div>
                          <div className="col-8 offset-2">
                            <strong>
                              <h5 style={{ fontWeight: "bolder" }}>
                                {meal.mealName}
                              </h5>
                              <span className="spanIt">Energy:</span>{" "}
                              {meal.totalEnergy} kCal
                              <br />
                              <span className="spanIt">Potassium:</span>{" "}
                              {meal.totalPotassium} mg
                              <br />
                              <span className="spanIt">Efficiency:</span>{" "}
                              {meal.efficiency} <br />
                            </strong>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ul>
              ) : (
                <div className="justify-content-center ml-5">
                  <h6>Click Add to add a meal to the dailyPlan</h6>
                </div>
              )}
            </Row>
          </div>
          {/* </div> */}
        </div>
      </Container>
    );
  }
}

export default DailyPlan;
