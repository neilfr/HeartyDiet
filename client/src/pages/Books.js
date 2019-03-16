import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
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
