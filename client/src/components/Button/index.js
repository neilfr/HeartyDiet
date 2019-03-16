import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function Button(props) {
  return (
    <span {...props} type="button" role="button" tabIndex="0">
      {props.children}
    </span>
  );
}

export default Button;
