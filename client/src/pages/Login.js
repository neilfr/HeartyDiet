import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn, Dropdown } from "../components/Form";
import axios from 'axios';
import {
  setInStorage,
  getFromStorage,
} from '../utils/storage';

class Login extends Component {
  constructor(props) {
    super(props);

      this.state = {
        isLoading: true,
        token: '',
        signUpError: '',
        signInError: '',
        signInEmail: '',
        signInPassword: '',
        signUpName: '',
        signUpEmail: '',
        signUpPassword: '',
      };

      this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
      this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
      this.onSignIn = this.onSignIn.bind(this);
    }

    componentDidMount() {
      const obj = getFromStorage('the_main_app');
      if (obj && obj.token) {
        const { token } = obj;
        // Verify the token
        axios.get('/api/account/verify?token=' + token)
        .then(res => {
          if (res.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
      } else {
        this.setState({
          isLoading: false,
        });
      }
    }

    onTextboxChangeSignInEmail(event) {
      this.setState({
        signInEmail: event.target.value,
      });
    }
    onTextboxChangeSignInPassword(event) {
      this.setState({
        signInPassword: event.target.value,
      });
    }
  
    onSignIn = e => {
      e.preventDefault();
      //Grab the state
      const {
        signInEmail,
        signInPassword,
      } = this.state;
  

      this.setState({
        isLoading: true,
      });
  
      //Post request to backend
      axios.post('/api/account/signin', {
          email: signInEmail,
          password: signInPassword,
      }).then(res => {
        console.log(res);
          if (res.data.success) {
            setInStorage('the_main_app', { token: res.token });
            this.setState({
              signInError: res.message,
              isLoading: false,
              signInEmail: '',
              signInPassword: '',
              token: res.token,
            });
            // REDIRECT TO FOOD HOMEPAGE
            window.location.href = '/AddFood'
          }
        }).catch(err => {

        });
    }

    render() {
      const {
        isLoading,
        token,
        signInError,
        signInEmail,
        signInPassword,
      } = this.state;


    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Please Login to plan your Hearty Diet.</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-4" />
          <Col size="md-4">
            <form>
              Email
              <Input
                type="email"
                placeholder="Email"
                value={signInEmail}
                onChange={this.onTextboxChangeSignInEmail}
              />
              Password
              <Input
                type="password"
                placeholder="Password"
                value={signInPassword}
                onChange={this.onTextboxChangeSignInPassword}
              />
              <FormBtn
                disabled={!(this.state.signInEmail && this.state.signInPassword)}
                onClick={this.onSignIn}
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


  // state = {
  //   userName: "",
  //   password: ""
  // };

  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.userName && this.state.password) {
  //     // API.login({
  //     //   userName: this.state.userName,
  //     //  password: this.state.passowrd,
  //     // })
  //     //   .then(
  //     //     res => this.loadFood()
  //     //   )
  //     //   .catch(err => console.log(err));
  //   }
  // };

  // render() {
  //   return (
  //     <Container fluid>
  //       <Row>
  //         <Col size="md-12">
  //           <Jumbotron>
  //             <h1>Login / Landing Page - Login is not actually working</h1>
  //           </Jumbotron>
  //         </Col>
  //       </Row>
  //       <Row>
  //         <Col size="md-4" />
  //         <Col size="md-4">
  //           <form>
  //             UserName
  //             <Input
  //               value={this.state.userName}
  //               onChange={this.handleInputChange}
  //               name="userName"
  //               placeholder=""
  //             />
  //             Password
  //             <Input
  //               value={this.state.password}
  //               onChange={this.handleInputChange}
  //               name="passoword"
  //               placeholder=""
  //             />
  //             <FormBtn
  //               disabled={!(this.state.userName && this.state.password)}
  //               onClick={this.handleFormSubmit}
  //             >
  //               Login
  //             </FormBtn>
  //           </form>
  //         </Col>
  //         <Col size="md-4" />
  //       </Row>
  //     </Container>
  //   );
  // }