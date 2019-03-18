import React from "react";

export function FoodContainer(props) {
    return <div>{props.children}</div>;
}

export function FoodPic({ thumbnail = "https://placehold.it/300x300" }) {
    return (
        <div>
            <img alt="foodPic" src={thumbnail} />
        </div>
    )
}

