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

    function handleProfileNav() {
        navigate(`/user_profile/${currentUser.id}`, { state: { currentUser }})
    }

    function handleSearchSandwichNav() {
        navigate('/sandwiches', { state: { currentUser }})
    }

    return (
        <div className="Restaurant-Profile">
            <div className="header">
                <header className="header-container">
                    <span>Welcome, {currentUser.username}!</span>
                    <div className="header-buttons" class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button onClick={handleProfileNav} class="btn btn-primary me-md-2" type="button">Profile</button>
                        <button class="btn btn-primary" type="button"><Link className ="link-to-log-out" to={'/'} >Log Out</Link></button>
                    </div>
                </header>
            </div>
            <br />
            <div>
                <button onClick={handleSearchSandwichNav} className="searchSandwichesBtn">Search by Sandwiches</button>
            </div>
            <h1>{restaurant.restaurant_name}</h1>
            <div className="restaurant-sandwich-div">
                <div className="sandwich-container">
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
        </div>
    )
}

export default RestaurantList