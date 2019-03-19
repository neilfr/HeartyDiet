import React, { Component } from "react";
import Button from "../components/Button";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import Card from "../components/Card";
import { Input, TextArea, FormBtn, Dropdown } from "../components/Form";

class FoodFavorite extends Component {
  state = {
    foodFavoriteList: [],
    customize: false,
    editFoodID: null,
    energy: "",
    potassium: ""
  };

  componentDidMount() {
    this.loadFoodFavorite("JohnSmith");
  }

  loadFoodFavorite = userName => {
    API.getFoodByUser(userName)
      .then(res => {
        this.setState({
          foodFavoriteList: res.data
        });
      })
      .catch(err => console.log(err));
  };

  deleteFood = id => {
    API.deleteFoodByID(id)
      .then(res => this.loadFoodFavorite("JohnSmith"))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.energy && this.state.potassium) {
      API.updateFoodByFoodID({
        energy: this.state.energy,
        potassium: this.state.potassium
      })
        .then(
          this.setState({
            energy: "",
            potassium: "",
            customize: false
          })
        )
        .catch(err => console.log(err));
    }
  };

  customize = id => {
    this.setState({
      customize: true,
      editFoodID: id
    });

    // API.deleteFoodByUser(id, "JohnSmith")
    //   .then(res => this.loadFoodFavorite())
    //   .catch(err => console.log(err));
  };

  editFoodByUser = id => {
    API.deleteFoodByUser(id, "JohnSmith")
      .then(res => this.loadFoodFavorite())
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
              <Col size="md-4">
                <Card
                  key={foodFavoriteList._id}
                  // onClick={() => this.saveFoodByUser(foodFavoriteList._id, "")}
                  // className="btn btn-light btn-lg btn-block"
                >
                  <strong>
                    Food Name: {foodFavoriteList.foodName} <br />
                    Food Group: {foodFavoriteList.foodGroupName} <br />
                    Energy: {foodFavoriteList.energy} <br />
                    Potassium: {foodFavoriteList.potassium} <br />
                    Efficiency: {foodFavoriteList.efficiency}
                    <br />
                    Username: {foodFavoriteList.userName} <br />
                  </strong>
                </Card>
              </Col>

              {this.state.customize &&
              this.state.editFoodID === foodFavoriteList._id ? (
                <Col size="md-8">
                  <Input
                    value={foodFavoriteList.energy}
                    //onChange={this.handleInputChange}
                    name="energy"
                    placeholder="Energy (required)"
                  />

                  <Input
                    value={foodFavoriteList.potassium}
                    //onChange={this.handleInputChange}
                    name="potassium"
                    placeholder="Potassium (required)"
                  />

                  <FormBtn
                    // disabled={!(this.state.energy && this.state.potassium)}
                    onClick={this.handleFormSubmit}
                  >
                    Submit Food
                  </FormBtn>
                </Col>
              ) : (
                <div>
                  <Col size="md-4">
                    <Button
                      key={foodFavoriteList._id}
                      onClick={() => this.customize(foodFavoriteList._id)}
                      className="btn btn-warning editFavoriteFoodBtn"
                    >
                      <strong>
                        Customize
                        <br />
                      </strong>
                    </Button>
                  </Col>
                  <Col size="md-4">
                    <Button
                      key={foodFavoriteList._id}
                      onClick={() => this.deleteFood(foodFavoriteList._id)}
                      className="btn btn-danger deleteFavoriteFoodBtn"
                    >
                      <strong>
                        Remove
                        <br />
                      </strong>
                    </Button>
                  </Col>
                </div>
              )}
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
