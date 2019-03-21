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
    energy: 0,
    potassium: 0,
    foodGroupName: "",
    foodGroupList: []
  };

  componentDidMount() {
    this.loadFoodFavorite("JohnSmith");
    this.loadFoodGroupByMasterAndUser("JohnSmith");
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

  deleteFood = (id, foodName) => {
    if (
      window.confirm(
        "Are you sure you would like to delete " +
          foodName +
          " from your Favorite Foods?"
      )
    ) {
      API.deleteFoodByID(id)
        .then(res => this.loadFoodFavorite("JohnSmith"))
        .catch(err => console.log(err));
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    if (this.state.energy && this.state.potassium && this.state.foodGroupName) {
      API.updateFoodByID(this.state.editFoodID, {
        energy: this.state.energy,
        potassium: this.state.potassium,
        foodGroupName: this.state.foodGroupName
      })
        .then(
          this.setState({
            energy: 0,
            potassium: 0,
            foodGroupName: "",
            customize: false
          })
        )
        .catch(err => console.log(err));

      this.loadFoodFavorite("JohnSmith");
    }
  };

  edit = (id, energy, potassium, foodGroupName) => {
    this.setState({
      customize: true,
      editFoodID: id,
      energy: energy,
      potassium: potassium,
      foodGroupName: foodGroupName
    });
  };

  loadFoodGroupByMasterAndUser = userName => {
    API.getFoodGroupByMasterAndUser(userName)
      .then(res =>
        this.setState({
          foodGroupList: res.data
        })
      )
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
                  <Dropdown
                    name="foodGroupName"
                    onChange={this.handleInputChange}
                    label="Food Group"
                    defaultValue={this.state.foodGroupName}
                  >
                    {this.state.foodGroupList.map(foodGroupList => (
                      <option value={foodGroupList.foodGroupName}>
                        {foodGroupList.foodGroupName}
                      </option>
                    ))}
                  </Dropdown>

                  <Input
                    defaultValue={foodFavoriteList.energy}
                    onChange={this.handleInputChange}
                    name="energy"
                    placeholder="Energy (required)"
                    type="text"
                  />

                  <Input
                    defaultValue={foodFavoriteList.potassium}
                    onChange={this.handleInputChange}
                    name="potassium"
                    placeholder="Potassium (required)"
                    type="text"
                  />

                  <FormBtn
                    // disabled={!(this.state.energy && this.state.potassium)}
                    onClick={this.handleFormSubmit}
                  >
                    Submit
                  </FormBtn>
                </Col>
              ) : (
                <div>
                  <Col size="md-4">
                    <Button
                      key={foodFavoriteList._id}
                      onClick={() =>
                        this.edit(
                          foodFavoriteList._id,
                          foodFavoriteList.energy,
                          foodFavoriteList.potassium,
                          foodFavoriteList.foodGroupName
                        )
                      }
                      className="btn btn-warning editFavoriteFoodBtn"
                    >
                      <strong>
                        Edit
                        <br />
                      </strong>
                    </Button>
                  </Col>
                  <Col size="md-4">
                    <Button
                      key={foodFavoriteList._id}
                      onClick={() =>
                        this.deleteFood(
                          foodFavoriteList._id,
                          foodFavoriteList.foodName
                        )
                      }
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
