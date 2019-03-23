import React from "react";
import "./style.css"

function CustomCard(props) {
    return (
        <div className="card pl-10">
            <h3 className="card-header info-color lighten-1 white-text text-uppercase font-weight-bold text-center py-5">{props.title}</h3>
            <div className="card-body">
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Food Group
                        <span className="badge badge-primary pt-3 group-name text-wrap">{props.foodGroup}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Energy
            <span className="badge primary-color  badge-pill">{props.energy} kCal</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Potassium
            <span className="badge primary-color badge-pill">{props.potassium} mg</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Efficiency
            <span className="badge primary-color badge-pill">{props.efficiency}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        User Name
            <span className="badge badge-primary pt-3">{props.username}</span>
                    </li>
                </ul>
                {/* <p className="text-small text-muted mb-0 pt-3">* At vero eos et accusamus et iusto ducimus.</p> */}
            </div>
        </div>

    )
}

export default CustomCard;