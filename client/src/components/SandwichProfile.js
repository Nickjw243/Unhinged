import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";


function SandwichProfile() {

    // user ID state management
    const { state } = useLocation()
    const { currentUser } = state
    const navigate = useNavigate()
    // console.log(currentUser)
    // user ID state management

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

    const handleCheckIn = () => {
        fetch('/checkin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: currentUser.id,
                sandwich_id: sandwichId,
            })
        })
        .then(r => r.json())
        .then(data => {
            console.log(data)
        })
    }
    

    function handleProfileNav() {
        navigate(`/user_profile/${currentUser.id}`, { state: { currentUser }})
    }

    function handleSearchSandwichNav() {
        navigate('/sandwiches', { state: { currentUser }})
    }

    return (
        <div className="Sandwich-Profile">
            <header className="header-container">
                <span>Welcome, {currentUser.username}!</span>
                <div className="header-buttons">
                    <button onClick={handleProfileNav}>Profile</button>
                    <button><Link className ="link-to-log-out" to={'/'} >Log Out</Link></button>
                </div>
            </header>
            <br />
            <div>
                <button onClick={handleSearchSandwichNav}>Search by Sandwiches</button>
            </div>
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
            <div>
                <button onClick={handleCheckIn}>
                    Check In
                </button>
            </div>
        </div>
    )
}

export default SandwichProfile