import React, { Component } from "react";
//import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn, Dropdown } from "../components/Form";
//import Button from "../components/Button";
const VerifyLogin = require("../utils/VerifyLogin");
const userID = VerifyLogin.verifyUserObj();

class FoodGroup extends Component {
  state = {
    foodGroupName: "",
    foodGroupList: "",
    pic: null
  };

  componentDidMount() {
    this.loadFoodGroupByMasterAndUser(userID);
  }

  verifyLogin = () => {
    let userObj = JSON.parse(localStorage.getItem("userObj"));
    if (userObj === null || userObj.Token === null || userObj.Token === "") {
      //REDIRCT THEM TO LOGIN
      window.location.href = "./";
    }
    {
      this.setState({
        userID: userObj.Token
      });
    }
  };

  loadFoodGroupByMasterAndUser = userID => {
    API.getFoodGroupByMasterAndUser(userID)
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
      this.findPic(this.state.foodGroupName);
      API.saveFoodGroup({
        foodGroupName: this.state.foodGroupName,
        userID: userID
      })

        .then(res => this.loadFoodGroupByMasterAndUser(userID))
        .catch(err => console.log(err));
    }
  };

  findPic = name => {
    API.getRecipes(name)
      .then(res => {
        const ImgRec = res.data.results.filter(recipe =>
          Boolean(recipe.thumbnail)
        );
        this.setState({ pics: ImgRec.length > 0 ? ImgRec[0].thumbnail : null });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          {this.state.foodGroupList.length ? (
            <div>
              {/* <ul class="list-group list-group-flush">
                <ul className="list-group list-group-horizontal"> */}
              {this.state.foodGroupList.map(foodGroupList => (
                <div
                  style={{ border: 2 }}
                  key={foodGroupList.foodGroupName}
                  className="flex-item"
                >
                  {/* <Link to={"/food/" + food._id}></Link> */}
                  <div>
                    {foodGroupList.image ? (
                      <img
                        className="card-img-left"
                        style={{ width: 95, height: 95 }}
                        alt="groupImg"
                        src={foodGroupList.image}
                      />
                    ) : (
                      <img
                        className="card-img-left"
                        style={{ width: 95, height: 95 }}
                        alt="groupImg"
                        src={this.state.pics}
                      />
                    )}
                    <h4> {foodGroupList.foodGroupName}</h4>
                    <br />
                  </div>

                  {/* <DeleteBtn  /> */}
                </div>
              ))}
              {/* </ul>
              </ul> */}
            </div>
          ) : (
            <h3>No Results to Display</h3>
          )}
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
