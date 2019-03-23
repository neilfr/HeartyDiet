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
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'


class Logout extends Component {
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
            user: ''
          };

          this.onLogout = this.onLogout.bind(this);
    }

    componentDidMount() {
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
          const { token } = obj;
          // Verify the token
          axios.get('/api/account/verify?token=' + token)
          .then(res => {
            if (res.data.success) {
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


      onLogout = e => {
        e.preventDefault();
        this.setState({
          isLoading: true,
        });
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
          const { token } = obj;
          // Verify the token
          axios.get('/api/account/logout?token=' + token)
          .then(res => {
            if (res.data.success) {
              this.setState({
                token: '',
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
          window.location.href= './'
        }
      }

}

export default Logout;



