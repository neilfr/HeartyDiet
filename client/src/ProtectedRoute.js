import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

const VerifyLogin = require("./utils/VerifyLogin");
const userID = VerifyLogin.verifyUserObj();
console.log(userID);

class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props;

    return (
      <Route
        {...props}
        render={props =>
          userID ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }
}
export default ProtectedRoute;
