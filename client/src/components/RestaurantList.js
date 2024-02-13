import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

function RestaurantList() {

    // const user = useSelector((state) => state.currentUser)
    // user ID state management
    const { state } = useLocation()
    const { currentUser: initialUser } = state
    const navigate = useNavigate()
    // user ID state management

    const [user, setUser] = useState(initialUser || null)

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    useEffect(() => {
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user))
        }
    }, [user])

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
        navigate(`/user_profile/${user.id}`, { state: { currentUser: user }})
    }

    function handleSearchSandwichNav() {
        navigate('/sandwiches', { state: { currentUser: user }})
    }

    return (
        <div className="Restaurant-Profile">
            <div className="main">
                <div className="header">
                    <header className="header-container">
                        <span>Welcome, {user.username}!</span>
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
                                        navigate(`/sandwiches/${value.id}`, { state: { currentUser: user }})})}>
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
        </div>
    )
}

export default RestaurantList