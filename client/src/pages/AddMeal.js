import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Card from "../components/Card";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn, Dropdown } from "../components/Form";
import DeleteBtn from "../components/DeleteBtn";
const VerifyLogin = require("../utils/VerifyLogin");
const userID = VerifyLogin.verifyUserObj();

class Meal extends Component {
  state = {
    mealName: "",
    mealList: []
  };

  componentDidMount() {
    this.loadMeals();
  }

  loadMeals = () => {
    API.getMealByUser(userID)
      .then(res => {
        this.setState({
          mealList: res.data
        });
      })
      .catch(err => console.log(err));
  };

  deleteMeal = id => {
    API.deleteMeal(id)
      .then(res => {
        console.log("res is: ", res.data);
        window.location.href = "/AddMeal";
        // this.setState({
        //   mealList: res.data
        // });
      })
      .catch(err => console.log(err));
  };

  // loadFood = () => {
  //   API.getFoodByFoodGroupNameAndUser("Sweets", "master")
  //     // API.getFoodByFoodGroupAndUser("Sweets", userID)
  //     .then(res =>
  //       this.setState({
  //         foodList: res.data,
  //         mealName: "",
  //         foods: 0
  //       })
  //     )
  //     .catch(err => console.log(err));
  // };

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
    console.log([name], value);
    // console.log(this.state.foods);
  };

  handleFormSubmit = event => {
    alert(this.state.foods);
    event.preventDefault();
    if (this.state.mealName) {
      API.saveMeal({
        mealName: this.state.mealName,
        userID: userID,
        totalEnergy: 0,
        totalPotassium: 0
      })
        //todo this refreshes the screen... or should i update state?
        .then(res => (window.location.href = "/AddMeal"))
        //.then(res => this.loadMeals())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        {/* <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Add New Meal</h1>
            </Jumbotron>
          </Col>
        </Row> */}
        <Row>
          <Col size="md-12">
            {/* <form> */}
            <Input
              value={this.state.mealName}
              onChange={this.handleInputChange}
              name="mealName"
              placeholder="Meal Name (required)"
            />
            <FormBtn
              disabled={
                !this.state.mealName

                // && this.state.foodGroup &&
                // this.state.energy &&
                // this.state.potassium
              }
              onClick={this.handleFormSubmit}
            >
              Add Meal
            </FormBtn>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <>
              {/* // name="foods" // onChange={this.handleInputChange}
              // label="Foods" // // value={this.state.foods[0].foodId}> */}
              {this.state.mealList.map(meal => (
                // <ListItem value={meal._id}>
                <Card value={meal._id}>
                  {meal.mealName}
                  <DeleteBtn onClick={() => this.deleteMeal(meal._id)} />
                </Card>
                // </ListItem>
              ))}
              {/* {console.log(this.state.mealList)} */}
            </>
            {/* <Input
                value={this.state.foods[0].servingSize}
                onChange={this.handleInputChange}
                name="servingsize"
                placeholder="Serving Size (optional)"
              /> */}

            {/* <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              /> */}
            {/* </form> */}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Meal;
