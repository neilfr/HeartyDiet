import React, { Component } from "react";
import Button from "../components/Button";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import Card from "../components/Card";
import { Input, TextArea, FormBtn, Dropdown } from "../components/Form";
import CustomCard from "../components/CustomCard";
const VerifyLogin = require("../utils/VerifyLogin");
const userID = VerifyLogin.verifyUserObj();

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
    this.loadFoodFavorite(userID);
    this.loadFoodGroupByMasterAndUser(userID);
  }

  loadFoodFavorite = userID => {
    API.getFoodByUser(userID)
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
        .then(res => this.loadFoodFavorite(userID))
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

      this.loadFoodFavorite(userID);
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

  loadFoodGroupByMasterAndUser = userID => {
    API.getFoodGroupByMasterAndUser(userID)
      .then(res =>
        this.setState({
          foodGroupList: res.data
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    var foodDisplay = {
      color: "#1e90ff",
      fontWeight: "bold"
    };
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            {/* <Jumbotron>
              <h1>View Food</h1>
            </Jumbotron> */}
          </Col>
        </Row>

        <Container fluid>
          <Row>
            <Col size="md-12 sm-12">
              <div className="text-center wow fadeInUp mt-5">
                <h2>View Favorite Foods</h2>
                <br />
                <h5>
                  Use this screen to view your favorite foods. Favorite foods
                  wil be used to create meals, etc. <br />
                  <br />
                </h5>
              </div>
            </Col>
          </Row>
        </Container>

        {this.state.foodFavoriteList.length ? (
          this.state.foodFavoriteList.map(foodFavoriteList => (
            <Row>
              <Col size="md-6" className="offset-2">
                <div className="m-5">
                  <CustomCard
                    key={foodFavoriteList._id}
                    title={foodFavoriteList.foodName}
                    foodGroup={foodFavoriteList.foodGroupName}
                    energy={foodFavoriteList.energy}
                    potassium={foodFavoriteList.potassium}
                    efficiency={foodFavoriteList.efficiency}
                    username={foodFavoriteList.use}
                  />
                </div>
              </Col>

              {this.state.customize &&
                this.state.editFoodID === foodFavoriteList._id ? (
                  <Col size="md-4">
                    <div className="mt-5">
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
                    </div>
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
                      className="btn peach-gradient"
                      // disabled={!(this.state.energy && this.state.potassium)}
                      onClick={this.edit}
                    >
                      <a style={{ fontWeight: "bolder" }}>
                        {" "}
                        CANCEL <i class="fa fa-remove" />
                      </a>
                    </FormBtn>

                    <FormBtn
                      className="btn blue-gradient"
                      // disabled={!(this.state.energy && this.state.potassium)}
                      onClick={this.handleFormSubmit}
                    >
                      <a style={{ fontWeight: "bolder" }}>
                        {" "}
                        SUBMIT <i class="fa fa-paper-plane" />
                      </a>
                    </FormBtn>
                  </Col>
                ) : (
                  <div className="conatiner button-container">
                    <Col size="md-4">
                      <div className="mt-5">
                        <button
                          key={foodFavoriteList._id}
                          onClick={() =>
                            this.edit(
                              foodFavoriteList._id,
                              foodFavoriteList.energy,
                              foodFavoriteList.potassium,
                              foodFavoriteList.foodGroupName
                            )
                          }
                          className="btn btn-outline-mdb-color waves-effect edit-button"
                        >
                          <a style={{ fontWeight: "bolder", fontSize: 15 }}>
                            EDIT
                          <i class="fa fa-pencil-square-o" />
                          </a>
                        </button>
                      </div>
                    </Col>
                    <Col size="md-4">
                      <button
                        key={foodFavoriteList._id}
                        onClick={() =>
                          this.deleteFood(
                            foodFavoriteList._id,
                            foodFavoriteList.foodName
                          )
                        }
                        className=" btn btn-outline-mdb-color waves-effect remove-button"
                      >
                        <a style={{ fontWeight: "bolder", fontSize: 15 }}>
                          REMOVE
                        <i class="fa fa-remove" />
                        </a>
                      </button>
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
