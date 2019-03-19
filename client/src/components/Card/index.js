import React from "react";
import "./style.css";

function Card({ children }) {
  return (
    // <div style={{ width: "18rem" }} className="card">
    <div style={{ width: "20rem" }} className="card">
      <div className="card-body">
        <div className="card-title">
          <div className="card-subtitle mb-2 text-muted">
            <div className="card-text">
              {/* <a href="#" class="card-link">Card link</a> */}

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
