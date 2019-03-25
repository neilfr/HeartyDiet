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
import './viewFoodStyle.css';
import 'font-awesome/css/font-awesome.min.css'
// import '../node_modules/react-vis/dist/style.css';
//import 'C:\Users\gurne\OneDrive\Documents\Project3\project3\client\node_modules/'
//import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis';

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
    this.loadMeals("JohnSmith");
    this.loadFoodFavorites("JohnSmith");
  }
  loadFoodFavorites = userName => {
    API.getFoodByUser(userName)
      .then(res => {
        console.log("foodFavoriteList is: ", res.data);
        this.setState({
          foodFavoriteList: res.data
        });
      })
      .catch(err => console.log(err));
  };

  loadMeals = userName => {
    API.getMealByUser(userName)
      .then(res => {
        console.log("getMealByUser returned: ", res.data);
        this.setState({
          mealList: res.data
        });
      })
      .catch(err => console.log(err));
  };

  selectMeal = meal => {
    console.log(meal);
    this.setState({ currentMeal: meal });
    console.log(
      "selected meal... now current meal state is:",
      this.state.currentMeal
    );

    var foodListArray = [];
    meal.foodList.map(food => {
      API.getFoodByID(food.food)
        .then(res => {
          console.log("getFoodByMealID returned: ", res);

          res.data.map(foodObject => {
            foodListArray.push(foodObject);

            this.setState({
              foodList: foodListArray
            });
          });
        })
        .catch(err => console.log(err));
    });
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
        console.log("data.data is:", data.data);
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
    alert(this.state.foods);
    event.preventDefault();
    if (this.state.mealName) {
      API.saveMeal({
        mealName: this.state.mealName,
        userName: "JohnSmith",
        totalEnergy: 0,
        totalPotassium: 0
      })
        //todo this refreshes the screen... or should i update state?
        .then(res => (window.location.href = "/ViewMeal"))
        // .then(res => (window.location.href = "/AddMeal"))
        //.then(res => this.loadMeals())
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
        <Row>
          <Col size="sm-12">
            <Jumbotron>
              <h1>View Meal</h1>
            </Jumbotron>
          </Col>
        </Row>
        {/* the charts and details should show here */}
        {this.state.currentMeal ? (
          <div>
            <div className="d-flex flex-row justify-content-center mb-1">
              <h3>Current Meal</h3>
            </div>
            <div className="d-flex flex-row justify-content-center mb-5">
              <div className='p-3 pl-5 dotted-div'><img style={thumbnail} alt="icon" src="https://i.imgur.com/ftEWZYQ.png" /><span className="meal-selected"> {this.state.currentMeal.mealName}</span></div>
              <div className='p-3 dotted-div'><img style={thumbnail} alt="icon" src="https://i.imgur.com/iCAG80W.png" />{this.state.currentMeal.totalEnergy}kCal</div>
              <div className='p-3 dotted-div'><img style={thumbnail} alt="icon" src="https://i.imgur.com/rK4wz3p.jpg" /> {this.state.currentMeal.totalPotassium}gm</div>
              <div className='p-3  pr-5 dotted-div'><img style={thumbnail} alt="icon" src="https://i.imgur.com/rK4wz3p.jpg" /> {this.state.currentMeal.efficiency}</div>
            </div>
          </div>
        ) : (

            <Row>
              <Col size="md-12 sm-12">
                <h6>
                  Select a Meal from the meal list to see what foods it contains
                  and to make changes
          </h6>
              </Col>
            </Row>
          )}

        <Col size="md-9 sm-9">
          <Input
            value={this.state.mealName}
            onChange={this.handleInputChange}
            name="mealName"
            placeholder="Enter meal name to create new meal"
          />
        </Col>
        <Col size="md-3 sm-3">
          <Button
            className="btn btn-primary"
            disabled={
              !this.state.mealName

              // && this.state.foodGroup &&
              // this.state.energy &&
              // this.state.potassium
            }
            onClick={this.handleFormSubmit}
          >
            Add Meal
            </Button>
        </Col>

        {/* end of add meal section */}
        <Col size="md-4 sm-4">
          <Row>
            <Col size="sm-12">
              <h6>Select a Meal</h6>
            </Col>
          </Row>
          )}
        </Col>

        <div className="col-3 ml-5">
          <div className=" justify-content-center">
            <h3 className='text-center'>Select a Meal</h3>
            <hr />
          </div>
          <Row>
            {this.state.mealList.length ? (
              <>
                <ul class="list-group list-group-flush">
                  <ul className="list-group">
                    {this.state.mealList.map(meal => (
                      <li className="list-group-item" key={meal._id} s>

                        {/* //todo: clicking on card isn't working...need to fix */}
                        {/* // onClick={() => this.selectMeal(meal)} */}
                        {/* <Link to={"/food/" + food._id}></Link> */}
                        <div className="row">
                          <div className="col-8">
                            <strong>
                              <h5 style={{ fontWeight: 'bolder' }}> Meal Name:<span className="meal-selected">{meal.mealName}</span> </h5>
                              <span className="spanIt">Energy:</span> {meal.totalEnergy} <br />
                              <span className="spanIt"> Potassium:</span> {meal.totalPotassium} <br />
                              {parseInt(meal.totalPotassium) === 0
                                ? 0
                                : parseFloat(
                                  parseInt(meal.totalEnergy) /
                                  parseInt(meal.totalPotassium)
                                ).toFixed(2)}
                              <br />
                            </strong>
                          </div>
                          <div className="col-2">
                            <button
                              // style={{ border: 0 }}
                              role="button"
                              type="button"
                              className="btn px-3 text-center blue-gradient "
                              onClick={() => this.selectMeal(meal)}
                            >
                              <div style={{ textAlign: 'center' }}><i class="fa fa-plus-circle fa-2x"></i></div>
                            </button>
                          </div>
                          <Button
                            className="btn btn-danger"
                            onClick={() => this.deleteMeal(meal._id)}
                          >
                            Delete
                      </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ul>
              </>
            ) : (
                <div className="justify-content-center">
                  <h6 className='text-center'>No Meals, Add a meal first</h6>
                </div>
              )}
          </Row>
        </div>
        <div className='col-3 offset-1'>

          <div className="justify-content-center ml-3">
            <h3>Customize your Meal</h3>
            <hr />
          </div>

          <Row>
            {this.state.currentMeal &&
              this.state.currentMeal.foodList.length > 0 ? (
                <ul class="list-group list-group-flush">
                  <ul className="list-group">
                    {this.state.currentMeal.foodList.map(food => (
                      <li className="list-group-item text-center"
                        key={food._id}>
                        <div>
                          <strong>
                            <h5 style={{ fontWeight: 'bolder' }}>{food.foodName}</h5>
                            <span className="spanIt">Energy:</span>{food.energy} <br />
                            <span className="spanIt">Potassium:</span>{food.potassium} <br />
                            <span className="spanIt"> ServingSize:</span>{food.servingSize}<br />
                            <span className="spanIt"> Efficiency:</span> {food.efficiency}<br />
                          </strong>
                        </div>
                        <button
                          className="btn px-3 text-center peach-gradient "
                          onClick={() => this.removeFromMeal(food._id)}
                        >
                          <div style={{ textAlign: 'center' }}><i class="fa fa-minus-circle fa-2x"></i></div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </ul>
              ) : (
                <h6>Click Add on a food item to add it to your meal</h6>
              )}
          </Row>
        </div>
        {/* <div className='col-3 offset-1'> */}

        <div className="justify-content-center ml-5">
          <h3>Add Favorite Foods</h3>
          <hr />
        </div>

        <Row>
          {this.state.foodFavoriteList.length ? (
            <ul class="list-group list-group-flush">
              <ul className="list-group">
                {this.state.foodFavoriteList.map(food => (
                  <li className="list-group-item" key={food._id}>
                    <div className="row">
                      <div className="col-2 mt-5">
                        <button
                          // style={{ border: 0 }} 
                          role="button"
                          type="button"
                          className="btn px-3 text-center blue-gradient "
                          onClick={() => this.addToMeal(food._id, 100)}
                        >
                          <div style={{ textAlign: 'center' }}><i class="fa fa-plus-circle fa-2x"></i></div>
                        </button>
                      </div>
                      <div className="col-8 offset-2">
                        <strong>
                          <h5 style={{ fontWeight: 'bolder' }}>{food.foodName} </h5>
                          <span className="spanIt">Energy:</span>{food.energy} <br />
                          <span className="spanIt">Potassium:</span> {food.potassium} <br />
                          <span className="spanIt">Efficiency:</span>{food.efficiency} <br />
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
      </Container>
    );
  }
}

export default Meal;
