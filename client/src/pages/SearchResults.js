import React from "react";
// import "./style.css";

function SearchResults(props) {
    return (
        <div>
            <h2>Your Search ends here</h2>
            <p>{props.results}</p>
        </div>

    );
}

export default SearchResults;
