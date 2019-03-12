import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/plan-meal"
          className={window.location.pathname === "/plan-meal" ? "nav-link active" : "nav-link"}
        >
          Plan Your Meal
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/add-food"
          className={window.location.pathname === "/add-food" ? "nav-link active" : "nav-link"}
        >
          Add New Food
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/daily-chart"
          className={window.location.pathname === "/daily-cahrt" ? "nav-link active" : "nav-link"}
        >
          Contact
        </Link>
      </li>
    </ul>
  );
}

export default Nav;
