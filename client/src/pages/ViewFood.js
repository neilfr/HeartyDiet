import React, { Component } from "react";
import Button from "../components/Button";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Card from "../components/Card";

class Food extends Component {
  state = {
    foodList: [],
    foodGroupList: [],
    foodName: "",
    foodGroupName: "",
    energy: "",
    potassium: "",
    efficiency: ""
  };

  componentDidMount() {
    this.loadFoodGroupMasterAndUser("JohnSmith");
  }

  loadFood = () => {
    API.getFood()
      .then(res =>
        this.setState({
          foodList: res.data,
          foodName: "",
          foodGroupName: "",
          energy: "",
          potassium: "",
          efficiency: ""
        })
      )
      .catch(err => console.log(err));
  };

  loadFoodGroupMasterAndUser = userName => {
    API.getFoodGroupByMasterAndUser(userName)
      .then(res =>
        this.setState({
          foodList: [],
          foodGroupList: res.data,
          foodName: "",
          foodGroupName: "",
          energy: "",
          potassium: "",
          efficiency: ""
        })
      )
      .catch(err => console.log(err));
  };

  loadFoodByFoodGroupName = foodGroupName => {
    API.getFoodByFoodGroupName(foodGroupName)
      .then(res =>
        this.setState({
          foodList: res.data,

          foodName: "",
          foodGroupName: "",
          energy: "",
          potassium: "",
          efficiency: ""
        })
      )
      .catch(err => console.log(err));
  };

  deleteFood = id => {
    API.deleteFood(id)
      .then(res => this.loadFood())
      .catch(err => console.log(err));
  };

  saveFoodByUser = id => {
    API.getFoodByID(id)

      .then(res => {
        API.saveFood({
          foodName: res.data.foodName,
          foodGroupName: res.data.foodGroupName,
          energy: res.data.energy,
          potassium: res.data.potassium,
          userName: "JohnSmith"
        })
          .then(
            res.data.forEach(function(element) {
              alert(element.foodName + " saved as favorite food");
            })
          )
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            {/* <Jumbotron>
              <h1>View Food</h1>
            </Jumbotron> */}
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
            {console.log(this.state.foodGroupList)}
            {this.state.foodGroupList.length ? (
              this.state.foodGroupList.map(foodGroupList => (
                <Button
                  key={foodGroupList.foodGroupName}
                  onClick={() =>
                    this.loadFoodByFoodGroupName(foodGroupList.foodGroupName)
                  }
                  className="btn btn-primary"
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

        {this.state.foodList.length ? (
          this.state.foodList.map(foodList => (
            <Row>
              <Col size="md-12">
                <Button
                  key={foodList._id}
                  onClick={() => this.saveFoodByUser(foodList._id, "")}
                  className="btn btn-light btn-lg btn-block"
                >
                  <strong>
                    Food Name: {foodList.foodName} <br />
                    Food Group: {foodList.foodGroupName} <br />
                    Energy: {foodList.energy} <br />
                    Potassium: {foodList.potassium} <br />
                    Efficiency: {foodList.efficiency}
                    <br />
                    Username: {foodList.userName} <br />
                  </strong>
                </Button>
              </Col>
            </Row>
          ))
        ) : (
          <h3>No Results to Display</h3>
        )}
      </Container>
    );
  }
}

export default Food;
