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
    this.loadMeals(userID);
  }
  loadMeals = userID => {
    API.getMealByUser(userID)
      .then(res => {
        console.log("MEALLIST IS: ", res.data);
        this.setState({
          mealList: res.data
        });
      })
      .catch(err => console.log(err));
  };

  loadDailyPlans = userID => {
    API.getDailyPlanByUser(userID)
      .then(res => {
        console.log("GETDAILYPLANBYUSER RETURNED: ", res.data);
        console.log("CURRENTDAILYPLAN STATE WILL BE SET TO: ", res.data[0]);
        this.setState({
          dailyPlanList: res.data,
          currentDailyPlan: res.data[0]
        });
      })
      .catch(err => console.log(err));
  };

  selectDailyPlan = dailyPlanId => {
    console.log("JUST GOT INTO SELECT DAILYPLAN AND PLANID IS:", dailyPlanId);
    API.getDailyPlanByID(dailyPlanId)
      .then(res => {
        console.log("GETDAILYPLANBYID RETURNED: ", res.data);
        this.setState({
          currentDailyPlan: res.data
        });
      })
      .catch(err => console.log(err));
  };

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
          totalPotassium += meal.totalPotassium;
          totalEnergy += meal.totalEnergy;
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
        console.log("FROM ADDMEALTODAILYPLANBYID data.data is:", data.data);
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
        {/* end of add dailyPlan section */}

        <Container fluid>
          <Row>
            <Col size="md-12 sm-12">
              <div className="text-center wow fadeInUp mt-5">
                {/* <h2>View Daily Plan</h2>
                <br /> */}
                <h5>
                  Create and edit a custom daily plan made up of meal(s). i.e.
                  Meatloaf Monday, Taco Tuesday, etc. <br />
                  <br />
                </h5>
              </div>
            </Col>
          </Row>
        </Container>

        <div className="col-4 offset-8 mb-2">
          <div className="input-group mt-3 form-sm form-2 pl-0">
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
              {/* <span class="input-group-text red lighten-3" id="basic-text1"><i class="fa fa-search" aria-hidden="true"></i></span> */}
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
          <div className="col-lg-12">
            <div className="d-flex flex-row justify-content-center mb-3 ">
              <div className="p-3 flex-fill dotted-div">
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
              <div className="p-3 flex-fill dotted-div">
                <img
                  style={thumbnail}
                  alt="icon"
                  src="https://i.imgur.com/iCAG80W.png"
                />
                {this.state.currentDailyPlan.totalEnergy}
              </div>
              <div className="p-3 flex-fill pr-5 dotted-div">
                <img
                  style={thumbnail}
                  alt="icon"
                  src="https://i.imgur.com/rK4wz3p.jpg"
                />
                {this.state.currentDailyPlan.totalPotassium}
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <h6 className="col-4 offset-8 mb-3 text-justify">
              Select a Meal from the meal list to see what foods it contains and
              to make changes
            </h6>
          </div>
        )}

        <Row>
          <Col size="md-4 sm-4">
            <div className="container">
              <Row>
                <h3 align="center" className=" pl-4">
                  Daily Plan List
                </h3>
              </Row>
              <Row>
                {this.state.dailyPlanList.length ? (
                  <ul className="list-group list-group-flush">
                    <ul className="list-group">
                      <>
                        {this.state.dailyPlanList.map(dailyPlan => (
                          <li className="list-group-item" key={dailyPlan._id}>
                            {/* <Link to={"/meal/" + meal._id}></Link> */}
                            <strong>
                              <h5 style={{ fontWeight: "bolder" }}>
                                {" "}
                                Daily Plan Name:{" "}
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
                            <button
                              className="btn px-3 text-center blue-gradient "
                              onClick={() =>
                                this.selectDailyPlan(dailyPlan._id)
                              }
                            >
                              <div style={{ textAlign: "center" }}>
                                <i className="fa fa-plus-circle fa-2x" />
                              </div>
                            </button>
                            <button
                              className="btn px-3 text-center peach-gradient "
                              onClick={() =>
                                this.deleteDailyPlan(dailyPlan._id)
                              }
                            >
                              <div style={{ textAlign: "center" }}>
                                <i className="fa fa-minus-circle fa-2x" />
                              </div>
                            </button>
                          </li>
                        ))}
                      </>
                    </ul>
                  </ul>
                ) : (
                  <h6>No DailyPlans, Add a dailyPlan first</h6>
                )}
              </Row>
            </div>
          </Col>
          <Col size="md-4 sm-4">
            <Row>
              <h3>Meals in your DailyPlan</h3>
            </Row>
            <Row>
              <div>
                {/* {this.state.dailyPlanMealList.length + " meals"} */}
                {this.state.currentDailyPlan &&
                this.state.currentDailyPlan.mealList.length > 0 ? (
                  <ul className="list-group list-group-flush">
                    <ul className="list-group">
                      {this.state.currentDailyPlan.mealList.map(meal => (
                        <li
                          className="list-group-item text-center"
                          key={meal._id}
                        >
                          <strong>
                            {meal.meal.mealName} <br />
                            Energy:{meal.meal.totalEnergy} kCal <br />
                            Potassium:{meal.meal.totalPotassium} mg
                            <br />
                            {/* <br /> ServingSize:{meal.servingSize}
                          <br /> */}
                            <br /> Efficiency: {meal.meal.efficiency} kCal/Kmg
                            <br />
                          </strong>
                          <Button
                            className="btn btn-danger"
                            onClick={() => this.removeFromDailyPlan(meal._id)}
                          >
                            Remove
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </ul>
                ) : (
                  <h6>Click Add on a meal card to add it to your dailyPlan</h6>
                )}
              </div>
            </Row>
          </Col>
          <Col size="md-4 sm-4">
            <Row>
              <h3 className="pl-5">Meals</h3>
            </Row>
            <Row>
              {this.state.mealList.length ? (
                <ul className="list-group list-group-flush">
                  <ul className="list-group">
                    {this.state.mealList.map(meal => (
                      <li
                        className="list-group-item text-center"
                        key={meal._id}
                      >
                        <strong>
                          {meal.mealName} <br />
                          Energy: {meal.totalEnergy} kCal
                          <br />
                          Potassium: {meal.totalPotassium} mg
                          <br />
                          Efficiency: {meal.efficiency} <br />
                        </strong>
                        <button
                          className="btn px-3 text-center blue-gradient"
                          onClick={() => this.addToDailyPlan(meal._id)}
                        >
                          <div style={{ textAlign: "center" }}>
                            <i className="fa fa-plus-circle fa-2x" />
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </ul>
              ) : (
                <h6>Click Add to add a meal to the dailyPlan</h6>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default DailyPlan;
