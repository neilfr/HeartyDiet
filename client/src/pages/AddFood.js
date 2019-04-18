import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn, Dropdown } from "../components/Form";

const VerifyLogin = require("../utils/VerifyLogin");
const userID = VerifyLogin.verifyUserObj();

class Food extends Component {
  state = {
    foodName: "",
    foodGroupName: "",
    energy: "",
    potassium: "",
    foodGroupList: []
  };

  componentDidMount() {
    this.loadFoodGroupByMasterAndUser(userID);
  }

  // verifyLogin = () => {
  //   let userObj = JSON.parse(localStorage.getItem("userObj"));
  //   if (userObj === null || userObj.Token === null || userObj.Token === "") {
  //     //REDIRCT THEM TO LOGIN
  //     window.location.href = "./";
  //   }
  //   {
  //     this.setState({
  //       userID: userObj.Token
  //     });
  //   }
  // };

  loadFoodGroupByMasterAndUser = userID => {
    API.getFoodGroupByMasterAndUser(userID)
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
        userID: userID
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
          <Col size="md-12 sm-12">
            <Container>
              <Container fluid>
                <Row>
                  <Col size="md-12 sm-12">
                    <div className="text-center wow fadeInUp mt-5">
                      {/* <h2>Add a Food Item Here</h2>
                      <br /> */}
                      <h5>
                        Create a new custom food item. <br />
                      </h5>
                    </div>
                  </Col>
                </Row>
              </Container>

              <form style={{ marginTop: 25 }}>
                Food Name
                <Input
                  value={this.state.foodName}
                  onChange={this.handleInputChange}
                  name="foodName"
                  placeholder="Enter Food Name (required)"
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
                Energy (kCal)
                <Input
                  value={this.state.energy}
                  onChange={this.handleInputChange}
                  name="energy"
                  placeholder="Enter Energy in kCal (required)"
                />
                Potassium (mg)
                <Input
                  value={this.state.potassium}
                  onChange={this.handleInputChange}
                  name="potassium"
                  placeholder="Enter Potassium in mg (required)"
                />
                {/* <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              /> */}
                <FormBtn
                  className="btn blue-gradient p-3"
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
                  <h6>Submit Food</h6>
                </FormBtn>
              </form>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Food;
