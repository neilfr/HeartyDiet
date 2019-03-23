import React from "react";
import { Link } from "react-router-dom";

function Nav() {
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
        {/* <li className="nav-item m-2">
            <a className="text-dark disabled" href="#">
              Disabled
            </Link>
          </li> */}
      </ul>
      {/* </div> */}
      <span className="navbar-text" align="right">
        Signed in as: <a href="/">Username To Go Here</a>
      </span>
    </nav>
  );
}

export default Nav;
