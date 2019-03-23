import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function AddBtn(props) {
  return (
    <button className="btn btn-primary add-btn" {...props}>
      Add
    </button>
  );
}

export default AddBtn;
