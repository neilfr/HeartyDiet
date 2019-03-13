import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Food extends Component {
  state = {
    foodName: "",
    foodGroup: "",
    energy: "",
    potassium: ""
  };

  componentDidMount() {
    this.loadFood();
  }

  loadFood = () => {
    API.getFood()
      .then(res =>
        this.setState({
          foodName: "",
          foodGroup: "",
          energy: "",
          potassium: ""
        })
      )
      .catch(err => console.log(err));
  };

  deleteFood = id => {
    API.deleteFood(id)
      .then(res => this.loadFood())
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
    if (
      this.state.foodName &&
      this.state.foodGroup &&
      this.state.energy &&
      this.state.potassium
    ) {
      API.saveFood({
        foodName: this.state.foodName,
        foodGroup: this.state.foodGroup,
        energy: this.state.energy,
        potassium: this.state.potassium
      })
        .then(res => this.loadFood())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Add Food</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.foodName}
                onChange={this.handleInputChange}
                name="foodName"
                placeholder="Food Name (required)"
              />
              <Input
                value={this.state.foodGroup}
                onChange={this.handleInputChange}
                name="foodGroup"
                placeholder="Food Group (required)"
              />
              <Input
                value={this.state.energy}
                onChange={this.handleInputChange}
                name="energy"
                placeholder="Energy (required)"
              />
              <Input
                value={this.state.potassium}
                onChange={this.handleInputChange}
                name="potassium"
                placeholder="Potassium (required)"
              />
              {/* <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              /> */}
              <FormBtn
                disabled={
                  !(
                    this.state.foodName &&
                    this.state.foodGroup &&
                    this.state.energy &&
                    this.state.potassium
                  )
                }
                onClick={this.handleFormSubmit}
              >
                Submit Food
              </FormBtn>
            </form>
          </Col>
          {/* <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col> */}
        </Row>
      </Container>
    );
  }
}

export default Food;
