import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormBtn } from "../Form";
import { getFromStorage, deleteFromStorage } from "../../utils/storage";
import axios from 'axios';


class Nav extends Component {

  constructor() {
    super();
    this.state = {
     user: {

     },
    }
  }

  componentDidMount = () => {
    this.setState({ user: JSON.parse(localStorage.getItem("userObj"))} ) 
  }

  userInfoButton() {
    return (
    <span className="navbar-text" align="right">
    Welcome: <a href="/">{this.state.user.name + ": " + this.state.user.email}</a>
    </span>
    )
  }
  

  onLogout = e => {
    e.preventDefault();
    const obj = getFromStorage('userObj');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify the token
      axios.get('/api/account/logout?token=' + token)
      .then(res => {
        if (res.data.success) {
          this.setState({
            user: '',
          })
          deleteFromStorage("userObj");
          window.location.href= '/'
        } else {
          alert('Logout Error.')
        }
      });
    } else {
      alert('No user logged in.')
    }
  }


  render() {

    console.log(this.state.user)

    return (
      <nav className="navbar navbar-expand-lg navbar-dark #ef5350 red lighten-1">
        <a className="navbar-brand" href="#">
          Hearty Diet
        </a>
        {/* <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button> */}
        {/* <div className="collapse navbar-collapse" id="navbarNav"> */}
        <ul className="nav">
          <li className="nav-item m-2">
            <Link to="/" className={window.location.pathname === "/" ? "text-white white-darker-hover font-weight-bold" : "text-dark"}>
              Home
              </Link>
          </li>
          <li className="nav-item m-2">
            <Link to="/AddFood" className={window.location.pathname === "/AddFood" ? "text-white white-darker-hover font-weight-bold" : "text-dark"}>
              Add Food
              </Link>
          </li>
          <li className="nav-item m-2">
            <Link to="/ViewFood" className={window.location.pathname === "/ViewFood" ? "text-white white-darker-hover font-weight-bold" : "text-dark grey-lighter-hover"}>
              View Food
              </Link>
          </li>
          <li className="nav-item m-2">
            <Link to="/AddFoodGroup" className={window.location.pathname === "/AddFoodGroup" ? "text-white white-darker-hover font-weight-bold" : "text-dark"}>
              Add Food Group
              </Link>
          </li>
          <li className="nav-item m-2">
            <Link to="/AddMeal" className={window.location.pathname === "/AddMeal" ? "text-white white-darker-hover font-weight-bold" : "text-dark"}>
              Add Meal
              </Link>
          </li>
          <li className="nav-item m-2">
            <Link to="/ViewMeal" className={window.location.pathname === "/ViewMeal" ? "text-white white-darker-hover font-weight-bold" : "text-dark"}>
              View Meal
              </Link>
          </li>
          <li className="nav-item m-2">
            <Link to="/ViewFoodFavorite" className={window.location.pathname === "/ViewFoodFavorite" ? "text-white white-darker-hover font-weight-bold" : "text-dark"}>
              View Favorite Foods
              </Link>
          </li>
          <li className="nav-item m-2">
            <a href='#' onClick={this.onLogout}>Logout</a>
          </li>
          {/* <li className="nav-item m-2">
              <a className="text-dark disabled" href="#">
                Disabled
              </Link>
            </li> */}
        </ul>
        {/* </div> */}
        
        {(this.state.user) ? this.userInfoButton():''}

      </nav>
    );
  }

}

export default Nav;
