import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Card from "../components/Card";

class Food extends Component {
  state = {
    foodList: [],
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
          foodList: res.data,
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

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>View Food</h1>
            </Jumbotron>

            {this.state.foodList.length ? (
              <List>
                {this.state.foodList.map(foodList => (
                  <Card key={foodList._id}>
                    {/* <Link to={"/food/" + food._id}></Link> */}
                    <strong>
                      Food Name: {foodList.foodName} <br />
                      Food Group: {foodList.foodGroup} <br />
                      Energy: {foodList.energy} <br />
                      Potassium: {foodList.potassium} <br />
                      Username: {foodList.userName} <br />
                    </strong>

                    {/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
                  </Card>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Food;
