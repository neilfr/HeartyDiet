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
        console.log("res is: ", res.data);
        this.setState({
          mealList: res.data
        });
      })
      .catch(err => console.log(err));
  };

  selectMeal = meal => {
    this.setState({ currentMeal: meal });
  };

  removeFromMeal = food => {
    console.log("remove food:", food);
    const updatedMeal = { ...this.state.currentMeal };
    console.log("updatedMeal is:", updatedMeal);
    const foodList = [...updatedMeal.foodList];
    const index = foodList.findIndex(v => v._id === food._id);
    console.log("index of food is:", index);
    foodList.splice(index, 1);
    console.log("new foodList is:", foodList);
    updatedMeal.foodList = [...foodList];
    console.log("updatedMeal is:", updatedMeal);
    API.updateMealByID(this.state.currentMeal._id, updatedMeal)
      .then(data => {
        console.log(data.data);
        this.setState({
          currentMeal: data.data
        });
      })
      .catch(err => console.log(err));
  };

  //! new version
  addToMeal = (food_id, servingSize) => {
    API.addFoodToMealByIDs(this.state.currentMeal._id, food_id, servingSize)
      .then(data => {
        console.log(data);
        // this.setState({
        //   currentMeal: data.data
        // });
      })
      .catch(err => console.log(err));
  };

  // addToMeal = food => {
  //   const updatedMeal = { ...this.state.currentMeal };
  //   //
  //   updatedMeal.foodList.push({
  //     _id: food._id,
  //     foodName: food.foodName,
  //     servingSize: 150
  //   });
  //   this.setState({
  //     currentMeal: updatedMeal
  //   });

  //   API.updateMealByID(this.state.currentMeal._id, updatedMeal)
  //     .then(data => {
  //       console.log(data.data);
  //       this.setState({
  //         currentMeal: data.data
  //       });
  //     })
  //     .catch(err => console.log(err));
  // };

  // deleteFood = id => {
  //   API.deleteFood(id)
  //     .then(res => this.loadFood())
  //     .catch(err => console.log(err));
  // };

  render() {
    console.log(this.state.currentMeal);
    return (
      <Container fluid>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>View Meal</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-3 sm-3">
            {this.state.mealList.length ? (
              <>
                {this.state.mealList.map(meal => (
                  <Card
                    key={meal._id}
                    //todo: clicking on card isn't working...need to fix
                    // onClick={() => this.selectMeal(meal)}
                  >
                    {/* <Link to={"/food/" + food._id}></Link> */}
                    <strong>
                      Meal Name:
                      <br /> {meal.mealName} <br />
                    </strong>
                    <Button
                      className="btn btn-primary"
                      onClick={() => this.selectMeal(meal)}
                    >
                      Select
                    </Button>
                  </Card>
                ))}
              </>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="md-9 sm-9">
            <Row>
              <div>
                <h3>foods in the meals go here</h3>
                {this.state.currentMeal &&
                this.state.currentMeal.foodList.length > 0 ? (
                  <List>
                    {this.state.currentMeal.foodList.map(food => (
                      <ListItem key={food._id}>
                        <strong>
                          <br /> {food.foodName} <br />
                        </strong>
                        <Button
                          className="btn btn-danger"
                          onClick={() => this.removeFromMeal(food)}
                        >
                          Remove
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <h3>No Results to Display</h3>
                )}
              </div>
            </Row>
            <Row>
              <h3>foods to pick from</h3>
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
                <h3>No Results to Display</h3>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Meal;
