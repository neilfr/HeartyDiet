import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn, Dropdown } from "../components/Form";

class Food extends Component {
  state = {
    foodName: "",
    foodGroupName: "",
    energy: "",
    potassium: "",
    foodGroupList: []
  };

  componentDidMount() {
    this.loadFoodGroupByMasterAndUser("JohnSmith");
  }

  loadFoodGroupByMasterAndUser = userName => {
    API.getFoodGroupByMasterAndUser(userName)
      .then(res =>
        this.setState({
          foodGroupList: res.data
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
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (
      this.state.foodName &&
      this.state.foodGroupName &&
      this.state.energy &&
      this.state.potassium
    ) {
      API.saveFood({
        foodName: this.state.foodName,
        foodGroupName: this.state.foodGroupName,
        energy: this.state.energy,
        potassium: this.state.potassium,
        userName: "JohnSmith"
      })
        .then(
          this.setState({
            foodName: "",
            foodGroupName: "",
            energy: "",
            potassium: ""
          })
        )
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            {/* <Jumbotron>
              <h1>Add Custom Food</h1>
            </Jumbotron> */}
            <form>
              <Input
                value={this.state.foodName}
                onChange={this.handleInputChange}
                name="foodName"
                placeholder="Food Name (required)"
              />

              <Dropdown
                name="foodGroupName"
                onChange={this.handleInputChange}
                label="Food Group"
                value={this.state.foodGroupName}
              >
                {this.state.foodGroupList.map(foodGroupList => (
                  <option value={foodGroupList.foodGroupName}>
                    {foodGroupList.foodGroupName}
                  </option>
                ))}
              </Dropdown>
              <Input
                value={this.state.energy}
                onChange={this.handleInputChange}
                name="energy"
                placeholder="Energy (required)"
              />
              <Input
                value={this.state.potassium}
                onChange={this.handleInputChange}
                name="potassium"
                placeholder="Potassium (required)"
              />
              {/* <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              /> */}
              <FormBtn
                disabled={
                  !(
                    this.state.foodName &&
                    this.state.foodGroupName &&
                    this.state.energy &&
                    this.state.potassium
                  )
                }
                onClick={this.handleFormSubmit}
              >
                Submit Food
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Food;
