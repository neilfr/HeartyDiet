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
//import Calendar from "../components/Calendar";
import Date from "../components/Date";
var moment = require("moment");
const VerifyLogin = require("../utils/VerifyLogin");
const userID = VerifyLogin.verifyUserObj();

class Schedule extends Component {
  state = {
    scheduleDate: "",
    dailyPlanList: [],
    scheduleDailyPlanList: [],
    scheduleList: null,
    currentSchedule: [],
    totalEnergy: null,
    totalPotassium: null,
    currentDailyPlan: [],
    scheduleObject: [],
    dailyPlanObject: [],
    mealObject: [],
    foodObject: [],
    scheduleContent: []
  };

  componentDidMount() {
    // this.loadSchedule(userID);
    this.loadDailyPlan(userID);

    this.setState({
      scheduleDate: moment().format("YYYY-MM-DD")
    });
  }
  // loadFoodFavorites = userID => {
  //   API.getFoodByUser(userID)
  //     .then(res => {
  //       console.log("foodFavoriteList is: ", res.data);
  //       this.setState({
  //         foodFavoriteList: res.data
  //       });
  //     })
  //     .catch(err => console.log(err));
  // };

  loadSchedule = userID => {
    API.getScheduleByUser(userID)
      .then(res => {
        this.setState({
          scheduleList: res.data
        });
      })
      .catch(err => console.log(err));
  };

  loadDailyPlan = userID => {
    API.getDailyPlanByUser(userID)
      .then(res => {
        this.setState({
          dailyPlanList: res.data
        });
      })
      .catch(err => console.log(err));
  };

  loadDailyPlanByScheduleDate = scheduleDate => {
    var scheduleFoodArray = [];

    API.getScheduleByScheduleDate(scheduleDate)
      .then(scheduleObject => {
        console.log("scheduleObject is:", scheduleObject);
        this.setState({
          currentSchedule: scheduleObject.data[0]
        });

        if (scheduleObject.data.length !== 0) {
          console.log("scheduleObject.data.length is greater than zero");
          scheduleObject.data.map(scheduleElement =>
            API.getDailyPlanByID(scheduleElement.dailyPlanID)
              .then(dailyPlanObject => {
                // this.setState({
                //   dailyPlanObject: dailyPlanObject.data
                // });
                console.log("dailyPlanObject is:", dailyPlanObject);
                dailyPlanObject.data.mealList.map(mealListID =>
                  API.getMealByID(mealListID)
                    .then(mealObject => {
                      console.log("mealObject is:", mealObject);
                      // this.setState({
                      //   mealObject: mealObject.data
                      // });

                      // scheduleContent += mealObject.data.mealName;

                      mealObject.data.foodList.map(foodList =>
                        API.getFoodByID(foodList.food._id)
                          .then(foodObject => {
                            //  console.log("foodObject is:", foodObject);
                            // foodObject.data.map(food =>
                            // let scheduleDailyPlanListObject = {
                            //   scheduleObject: {
                            //     dailyPlanObject: {
                            //       mealObject: {
                            //         foodObject
                            //       }
                            //     }
                            //   }
                            // };
                            console.log("foodObject is:", foodObject);
                            scheduleFoodArray.push(foodObject);
                            //);

                            this.setState({
                              scheduleContent: scheduleFoodArray
                            });
                          })
                          .catch(err => console.log(err))
                      );
                    })
                    .catch(err => console.log(err))
                );
              })
              .catch(err => console.log(err))
          );
        } //if statement
      })
      .catch(err => console.log(err));
  };

  removeFromSchedule = dailyPlanID => {
    API.removeDailyPlanFromScheduleByID(
      this.state.currentSchedule._id,
      dailyPlanID
    )
      .then(data => {
        // console.log("in remove food... data.data is", data.data);
        // console.log("foodlist is:", data.data.foodList);
        // const totalEnergy = data.data.foodList.reduce((a, b) => ({
        //   energy: a.energy + b.energy
        // }));
        // const totalPotassium = data.data.foodList.reduce((a, b) => ({
        //   potassium: a.potassium + b.potassium
        // }));
        const tempScheduleList = data.data.scheduleList;
        let totalPotassium = 0;
        let totalEnergy = 0;
        tempScheduleList.map(schedule => {
          totalPotassium += schedule.potassium;
          totalEnergy += schedule.energy;
        });
        console.log("total energy is:", totalEnergy);
        console.log("total potassium is:", totalPotassium);
        API.updateEnergyPotassiumTotalsForScheduleByID(
          this.state.currentSchedule._id,
          totalEnergy,
          totalPotassium
        ).then(data => {
          console.log(
            "dailyPlan data after food REMOVE, with updated totals",
            data.data
          );
          this.setState({
            currentSchedule: data.data
          });
        });
      })
      .catch(err => console.log(err));
  };

  //! new version
  addToSchedule = (
    dailyPlan_id,
    dailyPlanTotalEnergy,
    dailyPlanTotalPotassium
  ) => {
    // console.log("in addToDailyPlan");
    // console.log("food id is:", food_id);
    // console.log("servingSize is:", servingSize);

    let scheduleData = {
      scheduleDate: this.state.scheduleDate,
      userID: userID,
      totalEnergy: dailyPlanTotalEnergy,
      totalPotassium: dailyPlanTotalPotassium,
      dailyPlanID: dailyPlan_id
    };

    API.updateSchedule(scheduleData)
      .then(res => {
        // const tempDailyPlanList = data.data.dailyPlanList;
        // let totalPotassium = 0;
        // let totalEnergy = 0;
        // tempDailyPlanList.map(dailyPlan => {
        //   totalPotassium += dailyPlan.potassium;
        //   totalEnergy += dailyPlan.energy;
        // });

        // this.setState({
        //   currentSchedule: res.data
        // });
        this.loadDailyPlanByScheduleDate(this.state.scheduleDate);
      })
      .catch(err => console.log(err));
  };
  //next 3 functions from addDailyPlan.js
  deleteSchedule = id => {
    API.deleteSchedule(id)
      .then(res => {
        console.log("res is: ", res.data);
        window.location.href = "/ViewSchedule";

        // window.location.href = "/AddDailyPlan";
        // this.setState({
        //   dailyPlanList: res.data
        // });
      })
      .catch(err => console.log(err));
  };

  //  handleInputChange = event => {

  //   };

  handleInputChangeScheduleDate = event => {
    event.preventDefault();

    this.setState({
      scheduleDate: event.target.value,
      scheduleContent: []
    });

    this.loadDailyPlanByScheduleDate(event.target.value);

    console.log(
      "this.state.scheduleObject.dailyPlanID",
      this.state.scheduleObject.dailyPlanID
    );
    if (
      this.state.scheduleObject.dailyPlanID === null ||
      this.state.scheduleObject.dailyPlanID === undefined
    ) {
      var defaultData = {
        scheduleDate: event.target.value,
        userID: userID,
        dailyPlanID: null,
        totalEnergy: 0,
        totalPotassium: 0
      };

      if (event.target.value) {
        API.saveSchedule(defaultData)
          //todo this refreshes the screen... or should i update state?
          .then(
            //res => (window.location.href = "/ViewSchedule")
            //res =>
            this.setState({
              currentSchedule: defaultData
            })

            //  console.log(res.data)
          )
          // .then(res => (window.location.href = "/AddDailyPlan"))
          //.then(res => this.loadDailyPlans())
          .catch(err => console.log(err));
      }
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12 sm-12">
            <div className="text-center wow fadeInUp mt-5">
              <h2>View Schedule</h2>
              <br />
              <h5>
                {/* Use this screen to create and edit a custom daily schedule
                made up of one daily plan(s). i.e. Mon, Mar 4, 2019 will be
                  Meatloaf Monday. <br /> */}
                Use this screen to create and edit a custom daily schedule made
                up of one daily plan. <br />
                Start by selecting a Schedule Date.
                <br />
                <br />
              </h5>
            </div>
          </Col>
        </Row>

        {/* 
        <Container fluid>
          <Row>
            <Col size="md-12 sm-12">
              <div className="text-center wow fadeInUp mt-5">
                <h2>View Schedule</h2>
                <br />
                <h5>
                  Use this screen to create and edit a custom daily schedule
                  made up of one daily plan(s). i.e. Mon, Mar 4, 2019 could be
                  "Meatloaf Monday", etc.. <br />
                  Start by selecting a Schedule Date.
                  <br />
                  <br />
                </h5>
              </div>
            </Col>
          </Row>
        </Container> */}

        <Container>
          <Row>
            <Col size="md-4" align="center">
              <form>
                Schedule Date
                <Input
                  value={this.state.scheduleDate}
                  onChange={this.handleInputChangeScheduleDate}
                  name="scheduleDate"
                  type="date"
                  defaultValue={this.state.scheduleDate}
                />
              </form>
            </Col>
          </Row>
        </Container>

        {console.log(this.state.currentSchedule)}
        {this.state.currentSchedule ? (
          <Row>
            <Col size="md-12 sm-12">
              <div className="d-flex justify-content-center mb-5">
                {/* <strong>Selected DailyPlan: </strong>{" "}
              {this.state.currentDailyPlan.dailyPlanName} */}

                <div className="p-2">
                  <i className="fa fa-calendar" />{" "}
                  <strong>Scheduled Date: </strong>
                </div>
                <div className="p-2">
                  {moment(this.state.currentSchedule.scheduleDate).format(
                    "YYYY-MM-DD"
                  ) + " "}
                </div>
                <div className="p-2 pl-5">
                  {" "}
                  <i className="fa fa-bolt" />
                  <strong>Total Energy: </strong>
                  {this.state.currentSchedule.totalEnergy}{" "}
                </div>
                <div className="p-2 pl-5">
                  <i className="fa fa-kaggle" />
                  <strong>Total Potassium: </strong>
                  {this.state.currentSchedule.totalPotassium} mg{" "}
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          ""
        )}

        <Row>
          <Col size="md-6 sm-6">
            <div className="justify-content-left">
              <h3 className="text-center">DailyPlan List</h3>

              {/* <Row>
              <Col> */}

              {this.state.dailyPlanList.length ? (
                <ul className="list-group list-group-flush">
                  <ul className="list-group">
                    <>
                      {this.state.dailyPlanList.map(dailyPlan => (
                        <li
                          className="list-group-item text-center"
                          key={dailyPlan._id}
                          //todo: clicking on li isn't working...need to fix
                          // onClick={() => this.selectDailyPlan(dailyPlan)}
                        >
                          {/* <Link to={"/food/" + food._id}></Link> */}
                          <strong>
                            DailyPlan Name: {dailyPlan.dailyPlanName} <br />
                            Energy: {dailyPlan.totalEnergy} <br />
                            Potassium: {dailyPlan.totalPotassium} <br />
                          </strong>

                          <button
                            className="btn px-3 text-center blue-gradient"
                            onClick={() =>
                              this.addToSchedule(
                                dailyPlan._id,
                                dailyPlan.totalEnergy,
                                dailyPlan.totalPotassium
                              )
                            }
                          >
                            <div style={{ textAlign: "center" }}>
                              <i className="fa fa-plus-circle fa-2x" />
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
            </div>
          </Col>

          <Col size="md-6 sm-6">
            <div className="justify-content-right">
              <h3>Foods in your Schedule</h3>
              {console.log(
                "this.state.scheduleContent is",
                this.state.scheduleContent
              )}

              {/* {this.state.scheduleContent.map(food => (
              <Card key={food.data._id}>
                <strong>
                  <br /> {food.data.foodName} <br />
                  <br /> Energy:{food.data.energy} <br />
                  <br /> Potassium:{food.data.potassium} <br />
                  <br /> Efficiency:{food.data.efficiency}
                  {food.efficiency} <br />
                </strong>
              </Card>
            ))} */}

              {this.state.currentSchedule &&
              this.state.currentSchedule.dailyPlanID === null
                ? "Please add a Daily Plan to your schedule"
                : this.state.scheduleContent.map(food => (
                    <Card key={food.data._id}>
                      <strong>
                        <br /> {food.data.foodName} <br />
                        Energy: {food.data.energy} kCal
                        <br /> Potassium: {food.data.potassium} mg
                        <br /> Efficiency: {food.data.efficiency}
                        {food.efficiency} <br />
                      </strong>
                    </Card>
                  ))}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Schedule;
