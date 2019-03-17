import React from "react";


function Card(props) {
  return (
    <div style={{ width: "18rem" }} className="card">
      <div className="card-body">
        <div className="card-title">
          <div className="card-subtitle mb-2 text-muted">
            <div className="card-body">
              {/* <a href="#" class="card-link">Card link</a> */}



              {/* Food Name: {props.foodName} <br />
                Food Group: {props.foodGroupName} <br />
                Energy: {props.energy} <br />
                Potassium: {props.potassium} <br />
                Username: {props.userName} <br /> */}
              {props.foodName}


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
