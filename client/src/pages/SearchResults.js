import React from "react";
// import "./style.css";

function SearchResults(props) {
    return (
        <div>
            <h2>Your Search ends here</h2>
            <p>{props.foodName}</p>
            <p>Potassium Content:{props.potassium}gm</p>
        </div>

    );
}

export default SearchResults;
