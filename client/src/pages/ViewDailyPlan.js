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

class Meal extends Component {
  state = {
    // first item from add meal
    mealName: "",
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
    console.log(
      "selected meal... now current meal state is:",
      this.state.currentMeal
    );
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
    return (
      <Container fluid>
        <Row>
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
        </Row>
        {/* end of add meal section */}

        {this.state.currentMeal ? (
          <Row>
            <Col size="md-12 sm-12">
              <strong>Selected Meal: </strong> {this.state.currentMeal.mealName}
              <strong>Total Energy: </strong>
              {this.state.currentMeal.totalEnergy}
              <strong>Total Potassium: </strong>
              {this.state.currentMeal.totalPotassium}
            </Col>
          </Row>
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

        <Row>
          <Col size="md-4 sm-4">
            <Row>
              <h3>Meal List</h3>
            </Row>
            <Row>
              {this.state.mealList.length ? (
                <>
                  {this.state.mealList.map(meal => (
                    <Card key={meal._id}>
                      {/* <Link to={"/food/" + food._id}></Link> */}
                      <strong>
                        Meal Name: {meal.mealName} <br />
                        Energy: {meal.totalEnergy} <br />
                        Potassium: {meal.totalPotassium} <br />
                      </strong>
                      <Button
                        className="btn btn-primary"
                        onClick={() => this.selectMeal(meal)}
                      >
                        Select
                      </Button>
                      <Button
                        className="btn btn-danger"
                        onClick={() => this.deleteMeal(meal._id)}
                      >
                        Delete
                      </Button>
                    </Card>
                  ))}
                </>
              ) : (
                <h6>No Meals, Add a meal first</h6>
              )}
            </Row>
          </Col>
          <Col size="md-4 sm-4">
            <Row>
              <h3>Foods in your Meal</h3>
            </Row>
            <Row>
              <div>
                {this.state.currentMeal &&
                this.state.currentMeal.foodList.length > 0 ? (
                  <List>
                    {this.state.currentMeal.foodList.map(food => (
                      <Card key={food._id}>
                        <strong>
                          <br /> {food.food.foodName} <br />
                          <br /> Energy:{food.food.energy} <br />
                          <br /> Potassium:{food.food.potassium} <br />
                          <br /> ServingSize:{food.servingSize}
                          <br />
                          <br /> Efficiency:need to get virtual
                          {food.food.efficiency} <br />
                        </strong>
                        <Button
                          className="btn btn-danger"
                          onClick={() => this.removeFromMeal(food._id)}
                        >
                          Remove
                        </Button>
                      </Card>
                    ))}
                  </List>
                ) : (
                  <h6>Click Add on a food card to add it to your meal</h6>
                )}
              </div>
            </Row>
          </Col>
          <Col size="md-4 sm-4">
            <Row>
              <h3>Favorite Foods</h3>
            </Row>
            <Row>
              {this.state.foodFavoriteList.length ? (
                <List>
                  {this.state.foodFavoriteList.map(food => (
                    <ListItem key={food._id}>
                      <strong>
                        <br /> {food.foodName} <br />
                        <br /> Energy:{food.energy} <br />
                        <br /> Potassium:{food.potassium} <br />
                        <br /> Efficiency:{food.efficiency} <br />
                      </strong>
                      <Button
                        className="btn btn-primary"
                        onClick={() => this.addToMeal(food._id, 100)}
                      >
                        Add
                      </Button>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h6>Click Add to add a food to the meal</h6>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Meal;
