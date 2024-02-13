import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SearchSandwiches() {
// ./sandwiches

    // const user = useSelector((state) => state.currentUser)
    // console.log(user)

    // user ID state management
    const { state } = useLocation()

    // console.log('state.currentUser:', state.currentUser);
    const { currentUser: initialUser } = state
    // console.log('initialUser:', initialUser);

    const navigate = useNavigate()
    // console.log(currentUser)
    // user ID state management

    const [user, setUser] = useState(initialUser || null)

    console.log(user)
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        console.log('Stored user', storedUser)
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    useEffect(() => {
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user))
        }
    }, [user])

    const [sandwiches, setSandwiches] = useState([])

    useEffect(() => {
        fetch('/sandwiches')
        .then((r) => r.json())
        .then((data) => {
            setSandwiches(data)
        })
    }, [])

    function handleSandwichProfileNav() {
        navigate('/sandwiches/:id', { state: { currentUser: user }})
    }

    function handleProfileNav() {
        navigate(`/user_profile/${user.id}`, { state: { currentUser: user }})
    }

    return (
        <div className = "Sandwich-Search-page">
            <div className="main">
                <header className="header-container">
                    <span>Welcome, {user.username}!</span>
                    <div className="header-buttons" class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button onClick={handleProfileNav} class="btn btn-primary me-md-2" type="button">Profile</button>
                        <button class="btn btn-primary" type="button"><Link className ="link-to-log-out" to={'/'} >Log Out</Link></button>
                    </div>
                </header>
                <br />
                <div>
                    <button onClick={(() => {
                        navigate('/restaurants', { state: { currentUser: user }})})} className="searchRestaurantBtn">Search by Restaurant
                    </button>
                </div>
                <div class="container">
                    <SearchBar placeholder="Search for Sandwich..." sandwiches={sandwiches} handleSandwichProfileNav = {handleSandwichProfileNav}/>
                </div>
            </div>
        </div>
    )
}

export default SearchSandwiches