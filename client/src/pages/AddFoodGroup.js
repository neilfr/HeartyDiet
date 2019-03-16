import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn, Dropdown } from "../components/Form";
import Button from "../components/Button";

class FoodGroup extends Component {
  state = {
    foodGroupName: "",
    foodGroupList: ""
  };

  componentDidMount() {
    this.loadFoodGroupByMasterAndUser("JohnSmith");
  }

  loadFoodGroupByMasterAndUser = userName => {
    API.getFoodGroupByMasterAndUser(userName)
      .then(res =>
        this.setState({
          foodGroupName: "",
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
    if (this.state.foodGroupName) {
      API.saveFoodGroup({
        foodGroupName: this.state.foodGroupName,
        userName: "JohnSmith"
      })
        .then(res => this.loadFoodGroupByMasterAndUser("JohnSmith"))
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            {this.state.foodGroupList.length ? (
              this.state.foodGroupList.map(foodGroupList => (
                <Button
                  key={foodGroupList.foodGroupName}
                  className="btn btn-secondary"
                >
                  {/* <Link to={"/food/" + food._id}></Link> */}
                  <strong>
                    {foodGroupList.foodGroupName} <br />
                  </strong>

                  {/* <DeleteBtn  /> */}
                </Button>
              ))
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
            <form>
              <Input
                value={this.state.foodGroupName}
                onChange={this.handleInputChange}
                name="foodGroupName"
                placeholder="Food Group Name (required)"
              />

              <FormBtn
                disabled={!this.state.foodGroupName}
                onClick={this.handleFormSubmit}
              >
                Submit Food Group
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FoodGroup;
