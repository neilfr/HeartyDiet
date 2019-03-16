import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
      <a className="navbar-brand" href="/">
        Hearty Diet
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/AddFood">
              Add Food
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/ViewFood">
              View Food
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/AddMeal">
              Add Meal
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/ViewMeal">
              View Meal
            </a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link disabled" href="#">
              Disabled
            </a>
          </li> */}
        </ul>
      </div>
      <span className="navbar-text" align="right">
        Signed in as: <a href="/">Username To Go Here</a>
      </span>
    </nav>
  );
}

export default Nav;
