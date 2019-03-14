import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Card from "../components/Card";

class Meal extends Component {
  state = {
    mealList: []
  };

  componentDidMount() {
    this.loadMeal();
  }

  loadMeal = () => {
    API.getMeal()
      .then(res =>
        this.setState({
          mealList: res.data
        })
      )
      .catch(err => console.log(err));
  };

  // deleteFood = id => {
  //   API.deleteFood(id)
  //     .then(res => this.loadFood())
  //     .catch(err => console.log(err));
  // };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>View Meal</h1>
            </Jumbotron>

            {this.state.mealList.length ? (
              <List>
                {this.state.mealList.map(mealList => (
                  <Card key={mealList._id}>
                    {/* <Link to={"/food/" + food._id}></Link> */}
                    <strong>
                      Meal Name: {mealList.mealName} <br />
                      Food: {mealList.foods} <br />
                      Username: {mealList.userName} <br />
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

export default Meal;
