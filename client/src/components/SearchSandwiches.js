import React, { useContext, useEffect, useState } from "react";
// import { useUser } from "./UserContext";
import SearchBar from "./SearchBar";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SearchSandwiches() {
// ./sandwiches

    // user ID state management
    const { state } = useLocation()
    const { currentUser } = state
    const navigate = useNavigate()
    console.log(currentUser)
    // user ID state management

    const [sandwiches, setSandwiches] = useState([])

    useEffect(() => {
        fetch('/sandwiches')
        .then((r) => r.json())
        .then((data) => {
            setSandwiches(data)
        })
    }, [])

    function handleSandwichProfileNav() {
        navigate('/sandwiches/:id', { state: { currentUser }})
    }

    function handleProfileNav() {
        navigate(`/user_profile/${currentUser.id}`, { state: { currentUser }})
    }

    return (
        <div className = "Sandwich-main">
            <header>Welcome, {currentUser.username}!
            <br />
                <button onClick={handleProfileNav}>Profile</button>
            </header>
            <br />
            <div>
                <button onClick={(() => {
                    navigate('/restaurants', { state: { currentUser }})})}>Search by Restaurant
                </button>
            </div>
            <div>
                <SearchBar placeholder="Search for Sandwich..." sandwiches={sandwiches} handleSandwichProfileNav = {handleSandwichProfileNav}/>
            </div>
        </div>
    )
}

export default SearchSandwiches