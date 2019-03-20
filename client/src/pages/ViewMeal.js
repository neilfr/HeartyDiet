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
    currentMeal: {}
  };

  componentDidMount() {
    this.loadMeals("JohnSmith");
    this.loadFoodFavorite("JohnSmith");
  }
  loadFoodFavorite = userName => {
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
    // console.log("show the meal's foods");
    console.log("meal is: ", meal);
    // API.updateMealByID(mealId)

    this.setState({ currentMeal: meal });
  };

  addToMeal = food => {
    console.log("add this food to the meal's food list", food);
    console.log("push the following into the meal");
    console.log(food._id);
    console.log(food.foodName);
    console.log("serving size:", 150);
    // console.log("this.state.foodFavoriteList:", this.state.foodFavoriteList);
    // add the new food to the meal object's food list
    console.log("the current meal is: ", this.state.currentMeal);
    const updatedMeal = this.state.currentMeal;
    updatedMeal.foodList.push({
      _id: food._id,
      foodName: food.foodName,
      servingSize: 150
    });
    console.log("updatedMeal:", updatedMeal);

    console.log("current meal id is:", this.state.currentMeal._id);
    // todo update... update note occurring
    API.updateMealByID(this.state.currentMeal._id, updatedMeal)
      .then(
        this.setState({
          currentMeal: updatedMeal
        })
      )
      .catch(err => console.log(err));
  };

  // deleteFood = id => {
  //   API.deleteFood(id)
  //     .then(res => this.loadFood())
  //     .catch(err => console.log(err));
  // };

  render() {
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
                      </strong>
                      <Button
                        className="btn btn-primary"
                        onClick={() => this.addToMeal(food)}
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
