import React from "react";
// import "./style.css";

function SearchResults(props) {
    return (
        <div style={{ display: 'inline-blocks' }}>
            <p>{props.foodName}</p>
            <p>Potassium Content:{props.potassium}gm</p>
        </div>

    );
}

export default SearchResults;
