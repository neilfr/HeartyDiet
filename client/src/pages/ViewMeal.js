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
    mealList: [],
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
    this.setState({ currentMeal: meal });
  };

  removeFromMeal = foodID => {
    console.log("remove food:", foodID);
    console.log("from meal:", this.state.currentMeal._id);
    API.removeFoodFromMealByID(this.state.currentMeal._id, foodID)
      .then(data => {
        // console.log("in remove food... data.data is", data.data);
        // console.log("foodlist is:", data.data.foodList);
        // const totalEnergy = data.data.foodList.reduce((a, b) => ({
        //   energy: a.energy + b.energy
        // }));
        // const totalPotassium = data.data.foodList.reduce((a, b) => ({
        //   potassium: a.potassium + b.potassium
        // }));
        const tempFoodList = data.data.foodList;
        let totalPotassium = 0;
        let totalEnergy = 0;
        tempFoodList.map(food => {
          totalPotassium += food.potassium;
          totalEnergy += food.energy;
        });
        console.log("total energy is:", totalEnergy);
        console.log("total potassium is:", totalPotassium);
        API.updateEnergyPotassiumTotalsByID(
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
        const tempFoodList = data.data.foodList;
        let totalPotassium = 0;
        let totalEnergy = 0;
        tempFoodList.map(food => {
          totalPotassium += food.potassium;
          totalEnergy += food.energy;
        });
        // console.log("total energy is:", totalEnergy);
        // console.log("total potassium is:", totalPotassium);
        API.updateEnergyPotassiumTotalsByID(
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

  render() {
    const thumbnail = {
      width: 50,
      height: 50
    };
    // console.log(this.state.currentMeal);
    return (
      <Container fluid>

        <Row>
          <Col size="md-12 sm-12">
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
              <div className='p-3  pr-5 dotted-div'><img style={thumbnail} alt="icon" src="https://i.imgur.com/rK4wz3p.jpg" /> {this.state.currentMeal.totalPotassium}gm</div>
            </div>
          </div>
        ) : (
            <Row>
              <Col size="md-12 sm-12">
                <h6>Select a Meal</h6>
              </Col>
            </Row>
          )}

        <Row>
          <div className="col-3 ml-5">
            <Row>
              <div className="justify-content-center ml-3">
                <h3>Select a Meal</h3>
              </div>
            </Row>
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
                              <h5 style={{ fontWeight: 'bolder' }}> Meal Name:<span className="meal-selected">{meal.mealName}</span> </h5>
                              <span className="spanIt">Energy:</span> {meal.totalEnergy} <br />
                              <span className="spanIt"> Potassium:</span> {meal.totalPotassium} <br />
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
                          </div>
                        </li>
                      ))}
                    </ul>
                  </ul>
                </>
              ) : (
                  <div className="justify-content-center">
                    <h6>No Meals, Add a meal first</h6>
                  </div>
                )}
            </Row>
          </div>
          <div className='col-3 offset-1'>
            <Row>
              <div className="justify-content-center">
                <h3>Customize your Meal</h3>
              </div>
            </Row>
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
                              <span className="spanIt"> Efficiency:</span>need to get virtual{
                                food.efficiency
                              }{" "}
                              <br />
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
          <div className='col-3 offset-1'>
            <Row>
              <div className="justify-content-center ml-5">
                <h3>Add Favorite Foods</h3>
              </div>
            </Row>
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
                  <h6>Click Add to add a food to the meal</h6>
                )}
            </Row>
          </div>
        </Row>
      </Container>
    );
  }
}

export default Meal;
