import React from "react";
import "./style.css"

function CustomCard(props) {
    return (
        <div className="card pl-10">
            <h4 className="card-title text-center mt-3">{props.title}</h4>
            <hr class="hr-light" />
            <div className="card-text">
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Food Group
                        <span >{props.foodGroup}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Energy
            <span className="badge blue-gradient  badge-pill">{props.energy} kCal</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Potassium
            <span className="badge blue-gradient badge-pill">{props.potassium} mg</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Efficiency
            <span className="badge blue-gradient badge-pill">{props.efficiency}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        User Name
            <span>{props.username}</span>
                    </li>
                </ul>
                {/* <p className="text-small text-muted mb-0 pt-3">* At vero eos et accusamus et iusto ducimus.</p> */}
            </div>
        </div>

    )
}

export default CustomCard;