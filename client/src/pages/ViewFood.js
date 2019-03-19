import React, { Component } from "react";
import Button from "../components/Button";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Card from "../components/Card";
import { FoodPic, FoodContainer } from "./FoodPic";


class Food extends Component {
  state = {
    foodList: [],
    foodGroupList: [],
    foodName: "",
    foodGroupName: "",
    energy: "",
    potassium: "",
    pics: null,
    efficiency: ""
  };

  componentDidMount() {
    this.loadFoodGroupMasterAndUser("master");

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
    // this.findPic(foodGroupName)
    // this.setState((state, props) => {
    //   return { thumbnail: state.pics }
    // })
    console.log(this.state.thumbnail)
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
        console.log(res);
        API.saveFood(
          res.data.map(food => ({
            foodName: food.foodName,
            foodGroupName: food.foodGroupName,
            energy: food.energy,
            potassium: food.potassium,
            userName: "JohnSmith"
          }))
        )
          .then(
            res.data.forEach(function (element) {
              alert(element.foodName + " saved as favorite food");
            })
          )
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  // loading cards specific to food group on button click


  loadFoodCards = (GroupName) => {
    this.state.foodGroupList.map(group => {
      if (group.foodGroupName == GroupName) {
        this.loadFoodByFoodGroupName(GroupName)
        console.log(GroupName, this.state.foodList, this.state.pics)
      }
    })
  }

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
        <div className="container">
          <h4>Browse Common Foods</h4>
          <hr />
          <Row>
            {/* <Col size="md-12"> */}
            {/* {console.log(this.state.foodGroupList)} */}
            {this.state.foodGroupList.length ? (
              this.state.foodGroupList.map(foodGroupList => (
                <Col size="lg-4">
                  <Container>
                    {/* {console.log(foodGroupList.pic)} */}
                    <Row>
                      <Col size="md-4">
                        <img style={{ width: 85, height: 85, marginTop: 10 }} alt={foodGroupList.foodGroupName} src={foodGroupList.image} />
                      </Col>
                      <Col size="md-8">
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
                      </Col>
                    </Row>
                  </Container>
                </Col>
              ))
            ) : (
                <h3>No Results to Display1</h3>
              )}
            {/* </Col> */}
          </Row>
        </div>
        <Row>
          {this.state.foodList.length ? (
            this.state.foodList.map(foodList => (
              <Col size="md-3">
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
                    Username: {foodList.userName} <br />
                  </strong>
                </Button>
                {/* Efficiency: {foodList.efficiency}
                    <br />
                    Username: {foodList.userName} <br />
                  </strong> */}
                {/* </Button> */}
              </Col>

            ))
          ) : (
              <h3>No Results to Display</h3>
            )}
        </Row>
      </Container>
    );
  }
}

export default Food;
