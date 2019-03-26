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
    // this.loadSchedule("JohnSmith");
    this.loadDailyPlan("JohnSmith");

    this.setState({
      scheduleDate: moment().format("YYYY-MM-DD")
    });
  }
  // loadFoodFavorites = userName => {
  //   API.getFoodByUser(userName)
  //     .then(res => {
  //       console.log("foodFavoriteList is: ", res.data);
  //       this.setState({
  //         foodFavoriteList: res.data
  //       });
  //     })
  //     .catch(err => console.log(err));
  // };

  loadSchedule = userName => {
    API.getScheduleByUser(userName)
      .then(res => {
        this.setState({
          scheduleList: res.data
        });
      })
      .catch(err => console.log(err));
  };

  loadDailyPlan = userName => {
    API.getDailyPlanByUser(userName)
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
        // this.setState({
        //   scheduleObject: scheduleObject.data
        // });

        scheduleObject.data.map(scheduleElement =>
          API.getDailyPlanByID(scheduleElement.dailyPlanID)
            .then(dailyPlanObject => {
              // this.setState({
              //   dailyPlanObject: dailyPlanObject.data
              // });

              dailyPlanObject.data.mealList.map(mealListID =>
                API.getMealByID(mealListID)
                  .then(mealObject => {
                    // this.setState({
                    //   mealObject: mealObject.data
                    // });

                    // scheduleContent += mealObject.data.mealName;

                    mealObject.data.foodList.map(foodListID =>
                      API.getFoodByID(foodListID)
                        .then(foodObject => {
                          foodObject.data.map(food =>
                            // let scheduleDailyPlanListObject = {
                            //   scheduleObject: {
                            //     dailyPlanObject: {
                            //       mealObject: {
                            //         foodObject
                            //       }
                            //     }
                            //   }
                            // };
                            scheduleFoodArray.push(food)
                          );

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
      })
      .catch(err => console.log(err));
  };

  selectSchedule = schedule => {
    this.setState({ currentSchedule: schedule });
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
      userName: "JohnSmith",
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

    if (event.target.value) {
      API.saveSchedule({
        scheduleDate: event.target.value,
        userName: "JohnSmith"
        //dailyPlanList: this.state.dailyPlanList,
        // userName: "JohnSmith"
        //totalEnergy: this.state.totalEnergy,
        //totalPotassium: this.state.totalPotassium
      })
        //todo this refreshes the screen... or should i update state?
        .then
        //res => (window.location.href = "/ViewSchedule")
        ()
        // .then(res => (window.location.href = "/AddDailyPlan"))
        //.then(res => this.loadDailyPlans())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>View Schedule</h1>
            </Jumbotron>
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
            <form>
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

        {this.state.currentSchedule ? (
          <Row>
            <Col size="md-12 sm-12">
              {/* <strong>Selected DailyPlan: </strong>{" "}
              {this.state.currentDailyPlan.dailyPlanName} */}
              <strong>Total Energy: </strong>
              {this.state.currentSchedule.totalEnergy}
              <strong>Total Potassium: </strong>
              {this.state.currentSchedule.totalPotassium}
            </Col>
          </Row>
        ) : (
          <Row>
            <Col size="md-12 sm-12">
              <h6>
                Select a DailyPlan from the dailyPlan list to see what foods it
                contains and to make changes
              </h6>
            </Col>
          </Row>
        )}

        <Row>
          <Col size="md-4 sm-4">
            <h3>DailyPlan List</h3>

            {/* <Row>
              <Col> */}
            {this.state.dailyPlanList.length ? (
              <>
                {this.state.dailyPlanList.map(dailyPlan => (
                  <Card
                    key={dailyPlan._id}
                    //todo: clicking on card isn't working...need to fix
                    // onClick={() => this.selectDailyPlan(dailyPlan)}
                  >
                    {/* <Link to={"/food/" + food._id}></Link> */}
                    <strong>
                      DailyPlan Name: {dailyPlan.dailyPlanName} <br />
                      Energy: {dailyPlan.totalEnergy} <br />
                      Potassium: {dailyPlan.totalPotassium} <br />
                    </strong>

                    <Button
                      className="btn btn-primary"
                      onClick={() =>
                        this.addToSchedule(
                          dailyPlan._id,
                          dailyPlan.totalEnergy,
                          dailyPlan.totalPotassium
                        )
                      }
                    >
                      Add
                    </Button>
                  </Card>
                ))}
              </>
            ) : (
              <h6>No DailyPlans, Add a dailyPlan first</h6>
            )}
          </Col>

          <Col size="md-4 sm-4">
            <h3>Foods in your Schedule</h3>

            {this.state.scheduleContent.map(food => (
              <Card key={food._id}>
                <strong>
                  <br /> {food.foodName} <br />
                  <br /> Energy:{food.energy} <br />
                  <br /> Potassium:{food.potassium} <br />
                  <br /> Efficiency:need to get virtual
                  {food.efficiency} <br />
                </strong>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Schedule;
