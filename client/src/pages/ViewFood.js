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
import 'font-awesome/css/font-awesome.min.css'
//import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";



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

    API.getFoodByFoodName(this.state.foodSearch)
      .then(res =>
        this.setState({
          // results: res
          foodList: res.data
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    var foodDisplay = {
      color: '#1e90ff',
      fontWeight: 'bold'
    };
    var iconClass = {
      position: 'absolute',
      bottom: 0,
      right: 6
    };

    return (
      <Container fluid>
        <Row>
          <div className="col-6 search-bar offset-6" >
            <div className="input-group mt-3 form-sm form-2 pl-0">
              <input className="form-control my-0 py-1 red-border" type="text" placeholder="Enter Food Name" aria-label="Search"
                value={this.state.foodSearch}
                onChange={this.handleInputChange}
                name="foodSearch"
              />
              <div className="input-group-append">
                {/* <span class="input-group-text red lighten-3" id="basic-text1"><i class="fa fa-search" aria-hidden="true"></i></span> */}
                <button
                  className="input-group-text red lighten-3"
                  onClick={this.handleFormSubmit}><i className=" fa fa-search"></i>
                </button>
              </div>
            </div>

            {/* <form>
              <Input
                value={this.state.foodSearch}
                onChange={this.handleInputChange}
                name="foodSearch"
                placeholder="Enter Food Name"
              />
              <button
                onClick={this.handleFormSubmit}><i className="fa fa-search"></i>
              </button>
            </form> */}
          </div>
          {/* <SearchResults
            foodName={this.state.results.foodName}
            potassium={this.state.results.potassium}
          /> */}
        </Row>
        <div className="container">
          <h4>Browse Common Foods</h4>
          <hr />
          <Row>
            {this.state.foodGroupList.length ? (
              this.state.foodGroupList.map(foodGroupList => (
                <Col size="lg-4">
                  <Container >
                    <div className="holder container card"
                      onClick={() =>
                        this.loadFoodByFoodGroupName(foodGroupList.foodGroupName)
                      }>
                      {/* {console.log(foodGroupList.image)} */}
                      {/* <div className="card" style={{ width: 35 }}> */}
                      <div className="row p-2 pt-3">
                        <div className="col-4 view overlay zoom">
                          <img className="card-img-left" style={{ width: 95, height: 95 }} alt="foodPic" src={foodGroupList.image} />
                          {/* <Col size="md-6" className="card-body"> */}
                        </div>
                        <div className="col-6 offset-1">
                          <button
                            key={foodGroupList.foodGroupName}
                            className="custom-btn text-center">
                            {/* <Link to={"/food/" + food._id}></Link> */}
                            <strong>
                              <p className="card-title"> {foodGroupList.foodGroupName} </p>
                            </strong>
                          </button>
                        </div>

                      </div>
                      <div style={iconClass} className="moreIcon">
                        <p style={{ color: 'blue' }}>more</p>
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
              <Col size="md-6">
                <Button
                  key={foodList._id}
                  onClick={() => this.saveFoodByUser(foodList._id, "")}
                  className="btn btn-light btn-lg text-left designed p-5"
                >
                  <div className="card-content">
                    <strong>
                      <h5 style={foodDisplay}>{foodList.foodName}</h5><br />
                      Food Group: {foodList.foodGroupName} <br />
                      Energy: {foodList.energy}kCal <br />
                      Potassium: {foodList.potassium}gm <br />
                      Efficiency: {foodList.efficiency} <br />
                      Username: {foodList.userName} <br />
                    </strong>
                  </div>
                  <div className="text-right">
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
      </Container >
    );
  }
}

export default Food;
