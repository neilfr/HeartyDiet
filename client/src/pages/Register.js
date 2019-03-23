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

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            signUpError: '',
            signUpName: '',
            signUpEmail: '',
            signUpPassword: '',
        };

        this.onTextboxChangeSignUpName = this.onTextboxChangeSignUpName.bind(this);
        this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
        this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
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

    onTextboxChangeSignUpName(event) {
        this.setState({
            signUpName: event.target.value,
        });
    }
    onTextboxChangeSignUpEmail(event) {
        this.setState({
            signUpEmail: event.target.value,
        });
    }
    onTextboxChangeSignUpPassword(event) {
        this.setState({
            signUpPassword: event.target.value,
        });
    }

     onSignUp = (e)=> {
        e.preventDefault();
            //Grab state
    const {
        signUpName,
        signUpEmail,
        signUpPassword,
      } = this.state;
  
      this.setState({
        isLoading: true,
      });
      
      //Post request to backend
      axios.post('/api/account/signup', {
          name: signUpName,
          email: signUpEmail,
          password: signUpPassword,
      }).then(res => {
          console.log(res);
          if (res.data.success) {
            this.setState({
              signUpError: res.message,
              isLoading: false,
              signUpEmail: '',
              signUpName: '',
              signUpPassword: '',
            });
            //REDIRCT THEM TO LOGIN 
            window.location.href = './'
          }
        }).catch(err =>{
            //TELL THE USER THAT THE EMAIL ALREADY EXISTS 
        });
    }

    render() {
        const {
            isLoading,
            token,
            signUpError,
            signUpName,
            signUpEmail,
            signUpPassword,
        } = this.state;

        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>New User Registration</h1>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-4" />
                    <Col size="md-4">
                        <form>
                            Name 
                            <Input
                                type="text"
                                placeholder="Name"
                                value={signUpName}
                                onChange={this.onTextboxChangeSignUpName}
                            />
                            Email 
                            <Input 
                                type="email"
                                placeholder="Email"
                                value={signUpEmail}
                                onChange={this.onTextboxChangeSignUpEmail}
                            />
                            Password 
                            <Input 
                                type="password"
                                placeholder="Password"
                                value={signUpPassword}
                                onChange={this.onTextboxChangeSignUpPassword}
                            />
                            <FormBtn
                                disabled={!(this.state.signUpName && this.state.signUpEmail && this.state.signUpPassword)}
                                onClick={this.onSignUp}
                            >
                                Register
                            </FormBtn>
                        </form>
                    </Col>
                    <Col size="md-4" />
                </Row>
            </Container>
        );
    }
}

export default Register;