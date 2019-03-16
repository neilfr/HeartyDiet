import React, { Component } from "react";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import Card from "../components/Card";

class FoodFavorite extends Component {
  state = {
    foodFavoriteList: []
  };

  componentDidMount() {
    this.loadFoodFavorite("JohnSmith");
  }

  loadFoodFavorite = userName => {
    API.getFoodByUser(userName)
      .then(res =>
        this.setState({
          foodFavoriteList: res.data
        })
      )
      .catch(err => console.log(err));
  };

  deleteFood = id => {
    API.deleteFood(id)
      .then(res => this.loadFood())
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

        {this.state.foodFavoriteList.length ? (
          this.state.foodFavoriteList.map(foodFavoriteList => (
            <Row>
              <Col size="md-12">
                <Card key={foodFavoriteList._id}>
                  <strong>
                    Food Name: {foodFavoriteList.foodName} <br />
                    Food Group: {foodFavoriteList.foodGroupName} <br />
                    Energy: {foodFavoriteList.energy} <br />
                    Potassium: {foodFavoriteList.potassium} <br />
                    Username: {foodFavoriteList.userName} <br />
                  </strong>
                </Card>
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

export default FoodFavorite;
