import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function RestaurantList() {

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
                        <a>
                            <Link className="link-to-sandwich-profile" to={`/sandwiches/${value.id}`}>
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
                            </Link>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}

export default RestaurantList