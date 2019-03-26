import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import SearchResults from "./SearchResults";
import foods from "./food.json";
import { FoodPic, FoodContainer } from "./FoodPic";

class FoodItem extends Component {
  state = {
    results: "",
    foodSearch: "",
    pics: null
  };

  handleInputChange = event => {
    this.setState({ foodSearch: event.target.value });
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

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(foods);
    foods.map(item => {
      let key = item.id;
      if (item.foodID === this.state.foodSearch) {
        console.log(item.foodName);
        this.setState({ results: item });
        this.findPic(item.foodName);
      }
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <h1>What Food Can I Eat?</h1>
            <form>
              <Input
                value={this.state.foodSearch}
                onChange={this.handleInputChange}
                name="foodSearch"
                placeholder="Enter Food Name"
              />
              <FormBtn onClick={this.handleFormSubmit}>Search Food</FormBtn>
            </form>
          </Col>
        </Row>

        <SearchResults
          foodName={this.state.results.foodName}
          potassium={this.state.results.potassium}
        />
        <FoodContainer>
          {console.log(this.state.pics)}

          {this.state.pics && <FoodPic thumbnail={this.state.pics} />}
        </FoodContainer>
      </Container>
    );
  }
}

export default FoodItem;


{/* <Container fluid>
        <Row>
          <div className='col-6 offset-6 '>
            <div className="input-group mt-3 form-sm form-2 p-5">
              <input
                value={this.state.foodGroupName}
                onChange={this.handleInputChange}
                name="foodGroupName"
                placeholder="Food Group Name (required)"
              />
              <div className='input-group-append'>
                <button
                  disabled={!this.state.foodGroupName}
                  onClick={this.handleFormSubmit}>

                  Add Group
              </button>
              </div>
            </div>
          </div> */}

        //   <div>
        //   {foodGroupList.image ? (
        //     <img className="card-img-left" style={{ width: 95, height: 95 }} alt='groupImg'
        //       src={foodGroupList.image} />) : (
        //       <img className="card-img-left" style={{ width: 95, height: 95 }} alt='groupImg'
        //         src={this.state.pics} />)}
        //   <h4> {foodGroupList.foodGroupName}</h4><br />
        // </div>
