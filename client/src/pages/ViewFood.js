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
import "./viewFoodStyle.css";
import SearchResults from "./SearchResults";
//import { faHome } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.min.css'



class Food extends Component {
  state = {
    foodList: [],
    foodGroupList: [],
    foodName: "",
    foodGroupName: "",
    energy: "",
    potassium: "",
    pics: null,
    efficiency: "",
    results: [],
    foodSearch: "",
  };

  componentDidMount() {
    this.loadFoodGroupMasterAndUser("master");
    this.loadFood();
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

  // loading foodList specific to food group on button click
  // loadFoodCards = (GroupName) => {
  //   this.state.foodGroupList.map(group => {
  //     if (group.foodGroupName == GroupName) {
  //       this.loadFoodByFoodGroupName(GroupName)
  //       console.log(GroupName, this.state.foodList, this.state.pics)
  //     }
  //   })
  // }
  //for search bar
  loadFoodOnSearch = (id) => {
    console.log(this.state.foodList)
    this.state.foodList.map(foodItem => {
      if (foodItem.FoodID === id) {
        console.log(foodItem)
        this.setState({ results: foodItem })
        console.log(this.state.results)
      }
    })
  }

  handleInputChange = event => {
    this.setState({ foodSearch: event.target.value });

  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("something")
    console.log(this.state.foodSearch)
    console.log(this.state.foodList)
    //this.loadFoodOnSearch(this.state.foodSearch)
    this.state.foodList.map(foodItem => {
      var key = foodItem.id;
      var str = foodItem.foodName;
      // var array = str.split();
      if (foodItem.FoodID === this.state.foodSearch) {
        console.log(foodItem.foodName)
        this.setState({ results: foodItem })
        console.log(this.state.results)
      }
    })
  };

  render() {
    const holder = {
      height: '100px',
      backgroundColor: 'blue'
    };
    return (
      <Container fluid>
        <Row>
          <div className="col-6 offset-9 search-bar" >
            <form>
              <Input
                value={this.state.foodSearch}
                onChange={this.handleInputChange}
                name="foodSearch"
                placeholder="Enter Food Name"
              />
              <button
                onClick={this.handleFormSubmit}><i className="fa fa-search"></i>
              </button>
            </form>
          </div>
          <SearchResults
            foodName={this.state.results.foodName}
            potassium={this.state.results.potassium}
          />
        </Row>
        <div className="container">
          <h4>Browse Common Foods</h4>
          <hr />
          <Row>
            {this.state.foodGroupList.length ? (
              this.state.foodGroupList.map(foodGroupList => (
                <Col size="lg-4">
                  <Container >
                    <div className="holder"
                      onClick={() =>
                        this.loadFoodByFoodGroupName(foodGroupList.foodGroupName)
                      }>
                      {/* {console.log(foodGroupList.image)} */}
                      <Row style={{ backgroundColor: 'blue' }}>
                        {/* <Col size="md-4">
                          <img style={{ width: 85, height: 85, margin: 10 }} alt="foodPic" src={foodGroupList.image} />
                        </Col> */}
                        <Col size="md-8">

                          <Button
                            key={foodGroupList.foodGroupName}
                            className="custom-btn">
                            {/* <Link to={"/food/" + food._id}></Link> */}
                            <strong>
                              <p className="button-text"> {foodGroupList.foodGroupName} </p>
                            </strong>

                            {/* <DeleteBtn  /> */}
                          </Button>
                        </Col>
                      </Row>
                      <div className="text-right" style={{ marginRight: 10 }}>
                        <i className="fa fa-heartbeat"></i>
                      </div>
                    </div>
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
                    Efficiency: {foodList.efficiency} <br />
                    Username: {foodList.userName} <br />
                  </strong>
                  <div>
                    <i className="fa fa-gratipay"></i><br />
                    <p className="add-fav">Add to favorites</p>
                  </div>
                </Button>
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
