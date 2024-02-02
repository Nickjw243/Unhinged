import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

function RestaurantList() {

    // user ID state management
    const { state } = useLocation()
    const { currentUser } = state
    const navigate = useNavigate()
    console.log(currentUser)
    // user ID state management

    const [restaurant, setRestaurant] = useState({})
    const params = useParams()
    const restaurantId = params.id

    useEffect(() => {
        fetch(`/restaurants/${restaurantId}`)
        .then(r => r.json())
        .then(data => setRestaurant(data))
    }, [])

    if (!restaurant.restaurant_name) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="Restaurant-Profile">
            <h1>{restaurant.restaurant_name}</h1>
            <div className="restaurant-sandwich-div">
                {restaurant.sandwich.map((value, key) => {
                    return(
                        <a onClick={(() => {
                                navigate(`/sandwiches/${value.id}`, { state: { currentUser }})})}>
                            <div>
                                <img
                                className="restaurant-sandwich-image"
                                src={value.image}
                                alt = {value.sandwich_name}
                                ></img>
                            </div>
                            <div>
                                {value.sandwich_name}
                            </div>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}

export default RestaurantList