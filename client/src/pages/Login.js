import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn, Dropdown } from "../components/Form";
import axios from "axios";
import { setInStorage, getFromStorage } from "../utils/storage";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './viewFoodStyle.css'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: "",
      signUpError: "",
      signInError: "",
      signInEmail: "",
      signInPassword: "",
      signUpName: "",
      signUpEmail: "",
      signUpPassword: "",
      user: ""
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(
      this
    );
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(
      this
    );
    this.onSignIn = this.onSignIn.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage("userObj");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify the token
      axios.get("/api/account/verify?token=" + token).then(res => {
        if (res.success) {
          this.setState({
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value
    });
  }
  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }

  onSignIn = e => {
    e.preventDefault();
    //Grab the state
    const { signInEmail, signInPassword } = this.state;

    this.setState({
      isLoading: true
    });

    //Post request to backend
    axios
      .post("/api/account/signin", {
        email: signInEmail,
        password: signInPassword
      })
      .then(res => {
        console.log(res.data);
        if (res.data.success) {
          // setInStorage('userObj', { token: res.data.token });
          this.setState({
            signInError: res.message,
            isLoading: false,
            signInEmail: "",
            signInPassword: "",
            token: res.data.token,
            user: res.data.user
          });

          res.data.user.token = res.data.token;

          setInStorage("userObj", res.data.user);
          // REDIRECT TO FOOD HOMEPAGE
          window.location.href = "/AddFood";
        }
      })
      .catch(err => { });
  };

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword
    } = this.state;

    const mainBg = {
      backgroundImage: 'url("./heart_2.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }

    return (

      <Container fluid>
        {/* <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Please Login to plan your Hearty Diet.</h1>
            </Jumbotron>
          </Col>
        </Row> */}
        <div style={mainBg} className="pb-5 mb-3">
          <div className="row justify-content-right">
            <div className="col-lg-3 col-sm-12 offset-4 pr-0">
              <Row>
                <Col size="md-12 sm-12">
                  <div className="wow fadeInUp mt-3 hedaing-div">
                    <h2 className="landing-head">
                      Hearty Diet
                       <hr />
                      <h3>Meal Management and Potassium Nutrient Tracker</h3>
                    </h2>
                    <br />
                    <h5>
                      Please login or register to begin. <br />
                      <br />
                      <b> Registration is free!</b>
                      <br />
                    </h5>

                    <h6>
                      This Web application was developed as a part of the University
                  of Toronto Full Stack Web Development Bootcamp program. <br />
                      This Web application allows meal planning and specifically
                      focused on potassium instake. Functionality to support other
                      nutrients can be added in he future.
                  <br />
                      <br />
                    </h6>
                  </div>
                </Col>
              </Row>
            </div >

            <div className="col-lg-4 col-sm-12 mt-3 offset-1">
              <Row>
                <Col size="md-9">
                  <div className="login-div">
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
                        disabled={
                          !(this.state.signInEmail && this.state.signInPassword)
                        }
                        onClick={this.onSignIn}
                      >
                        <div style={{ textAlign: "center" }}>
                          Login
                        </div>
                      </FormBtn>
                      <br />
                      <Link to="/register">Register New User</Link>
                    </form>
                  </div>
                </Col>
                <Col size="md-4" />
              </Row>
            </div>
          </div>
        </div>
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
