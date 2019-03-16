import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn, Dropdown } from "../components/Form";

class Meal extends Component {
  state = {
    mealName: "",
    foods: 0,
    // foods: [
    //   {
    //     foodId: "",
    //     servingSize: ""
    //   }
    // ],
    foodList: []
  };

  componentDidMount() {
    this.loadFood();
  }

  loadFood = () => {
    API.getFoodByFoodGroupNameAndUser("Sweets", "master")
      // API.getFoodByFoodGroupAndUser("Sweets", "JohnSmith")
      .then(res =>
        this.setState({
          foodList: res.data,
          mealName: "",
          foods: 0
        })
      )
      .catch(err => console.log(err));
  };

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
    console.log(this.state.foods);
  };

  handleFormSubmit = event => {
    alert(this.state.foods);
    event.preventDefault();
    if (this.state.mealName) {
      API.saveMeal({
        mealName: this.state.mealName,
        foods: this.state.foods,
        userName: "JohnSmith"
      })
        .then()
        //.then(res => this.loadMeal())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Add Custom Meal</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.mealName}
                onChange={this.handleInputChange}
                name="mealName"
                placeholder="Meal Name (required)"
              />

              <Dropdown
                name="foods"
                onChange={this.handleInputChange}
                label="Foods"
                // value={this.state.foods[0].foodId}
              >
                {this.state.foodList.map(foodList => (
                  <option value={foodList._id}>{foodList.foodName}</option>
                ))}
                {console.log(this.state.foodList)}
              </Dropdown>
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
              <FormBtn
                disabled={
                  !this.state.mealName

                  // && this.state.foodGroup &&
                  // this.state.energy &&
                  // this.state.potassium
                }
                onClick={this.handleFormSubmit}
              >
                Submit Meal
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Meal;
