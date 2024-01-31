import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SandwichProfile() {

    const [sandwich, setSandwich] = useState({})
    const params = useParams()
    const sandwichId = params.id

    useEffect(() => {
        fetch(`/sandwiches/${sandwichId}`)
        .then((r) => r.json())
        .then((data) => setSandwich(data))
    }, [sandwichId])

    if (!sandwich.sandwich_name) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="Sandwich-Profile">
            <h1>Sandwich Profile</h1>
            <div className="sandwich-title">
                <h2>{sandwich.sandwich_name}</h2>
            </div>
            <div className="sandwich-img-div">
                <img
                className="sandwich-img"
                src = {sandwich.image}
                alt = {sandwich.sandwich_name}
                ></img>
            </div>
        </div>
    )
}

export default SandwichProfile