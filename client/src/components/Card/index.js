import React from "react";
import "./style.css";


function Card(props) {
  return (
    // <div style={{ width: "18rem" }} className="card">
    <div style={{ width: "20rem" }} className="card">
      <div className="card-body">

        <div className="card-title">
          <div className="card-subtitle mb-2 text-muted">
            <div className="card-body" role="button" onClick={() => props.saveFoodByUser(props.id, "")}>
              Food Name:{props.foodList.foodName} <br />
              Food Group: {props.foodList.foodGroupName} <br />
              Potassium: {props.foodList.potassium} <br />
              Energy:{props.foodList.energy}<br />
              Efficiency:{props.foodList.efficiency}<br />
              Username: {props.foodList.userName} <br />
            </div>
            <buttton role="button" ></buttton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
