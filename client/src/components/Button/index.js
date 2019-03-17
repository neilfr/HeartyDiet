import React from "react";
import "./style.css";
import Card from "../Card"
import { Col, Row, Container } from "../Grid";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function Button(props) {
  return (
    <div>
      <div>
        <div className="design text-center" role="button" tabIndex="0"
          onClick={() => {
            props.loadFoodCards(props.GroupName)
          }}
        ><h5>{props.GroupName}</h5>
        </div >
      </div>
      {/* <Card {...props} /> */}
    </div>
  )
}

export default Button;
