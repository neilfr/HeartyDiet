import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn, Dropdown } from "../components/Form";

class Login extends Component {
  state = {
    userName: "",
    password: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.userName && this.state.password) {
      // API.login({
      //   userName: this.state.userName,
      //  password: this.state.passowrd,
      // })
      //   .then(
      //     res => this.loadFood()
      //   )
      //   .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Login / Landing Page - Login is not actually working</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-4" />
          <Col size="md-4">
            <form>
              UserName
              <Input
                value={this.state.userName}
                onChange={this.handleInputChange}
                name="userName"
                placeholder=""
              />
              Password
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="passoword"
                placeholder=""
              />
              <FormBtn
                disabled={!(this.state.userName && this.state.password)}
                onClick={this.handleFormSubmit}
              >
                Login
              </FormBtn>
            </form>
          </Col>
          <Col size="md-4" />
        </Row>
      </Container>
    );
  }
}

export default Login;
